import { GtfsReducedRouteSchema } from "./models/transportModels/v1/gtfsReducedRouteSchema"
import { GtfsReducedStopSchema } from "./models/transportModels/v1/gtfsReducedStopSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// Function to extract data for reduced dataset then save it in the mongodb database
export const reduceSaveBusRouteAndStops = async (busRoute, singleRoute) => {
  let reducedRoute = singleRoute.substr(0, singleRoute.indexOf("."))

  let loop = 0
  do {
    if (busRoute.features[loop].geometry.type === "LineString") {
      // Change order of coordinates
      let i = 0
      let googleMapsCoords = []
      do {
        const coordsSchema = new CoordsSchema({
          lat: busRoute.features[loop].geometry.coordinates[i][1],
          lng: busRoute.features[loop].geometry.coordinates[i][0],
        })

        googleMapsCoords.push(coordsSchema)

        i++
      } while (i < busRoute.features[loop].geometry.coordinates.length)

      // And save it in a gtfsReducedRouteSchema collection
      const gtfsReducedRouteSchema = new GtfsReducedRouteSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        routeVisible: false,
        agencyName: busRoute.features[loop].properties.agency_name,
        markerType: busRoute.features[loop].geometry.type,
        routeKey: reducedRoute + "+" + loop,
        routeColor: busRoute.features[loop].properties.route_color,
        routeLongName: busRoute.features[loop].properties.route_long_name,
        routeNumber: busRoute.features[loop].properties.route_short_name,
        routeCoordinates: googleMapsCoords,
      })

      // Save the gtfsReducedRouteSchema in the database
      gtfsReducedRouteSchema
        .save()
        .then(() => {
          // console.log("gtfsReducedRouteSchema collection saved successfully")
        })
        .catch((err) => {
          console.error(err)
        })
    }

    if (busRoute.features[loop].geometry.type === "Point") {
      const coordsSchema = new CoordsSchema({
        lat: busRoute.features[loop].geometry.coordinates[1],
        lng: busRoute.features[loop].geometry.coordinates[0],
      })

      // And save it in a gtfsReducedStopsSchema collection
      const gtfsReducedStopSchema = new GtfsReducedStopSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        markerType: busRoute.features[loop].geometry.type,
        stopKey: reducedRoute + "+" + loop,
        stopCode: busRoute.features[loop].properties.stop_code,
        stopID: busRoute.features[loop].properties.stop_id,
        stopColor: busRoute.features[loop].properties.routes[0].route_color,
        stopName: busRoute.features[loop].properties.stop_Name,
        stopCoordinates: coordsSchema,
      })

      // Save the gtfsReducedStopsSchema in the database
      gtfsReducedStopSchema
        .save()
        .then(() => {
          // console.log("gtfsReducedStopSchema collection saved successfully")
        })
        .catch((err) => {
          console.error(err)
        })
    }

    loop++
  } while (loop < busRoute.features.length)
}
