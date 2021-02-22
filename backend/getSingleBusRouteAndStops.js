const fs = require("fs")
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
import { GtfsRouteSchema } from "./models/transportModels/v1/gtfsRouteSchema"
import { GtfsStopSchema } from "./models/transportModels/v1/gtfsStopSchema"

// This routine is called from the individual route button
// -------------------------------------------------------

// Function to fetch data from a single GeoJson route file
export const getSingleBusRouteAndStops = async (singleRoute) => {
  const rawGeojson = process.env.GEOJSON_FILES_PATH + singleRoute

  fs.readFile(rawGeojson, "utf8", (err, data) => {
    if (err) {
      //   console.log("Error fetching data from a single geojson file")
      throw err
    }

    // Now pass data from a single GeoJson route filename to reduceSaveBusRouteAndStops function
    reduceSaveBusRouteAndStops(JSON.parse(data), singleRoute)
  })
}

// Function to extract data for reduced dataset then save it in the mongodb database
const reduceSaveBusRouteAndStops = async (busRoute, singleRoute) => {
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

      // And save it in a gtfsRouteSchema collection
      const gtfsRouteSchema = new GtfsRouteSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        routeVisible: false,
        agencyName: busRoute.features[loop].properties.agency_name,
        agencyId: busRoute.features[loop].properties.agency_id,
        markerType: busRoute.features[loop].geometry.type,
        routeKey: reducedRoute + "+" + loop,
        routeColor: busRoute.features[loop].properties.route_color,
        routeLongName: busRoute.features[loop].properties.route_long_name,
        routeNumber: busRoute.features[loop].properties.route_short_name,
        routeCoordinates: googleMapsCoords,
      })

      // Save the gtfsRouteSchema in the database
      gtfsRouteSchema
        .save()
        .then(() => {
          // console.log("gtfsRouteSchema collection saved successfully")
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

      // And save it in a gtfsStopsSchema collection
      const gtfsStopSchema = new GtfsStopSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        agencyName: busRoute.features[loop].properties.agency_name,
        agencyId: busRoute.features[loop].properties.routes[0].agency_id,
        markerType: busRoute.features[loop].geometry.type,
        stopKey: reducedRoute + "+" + loop,
        stopCode: busRoute.features[loop].properties.stop_code,
        stopId: busRoute.features[loop].properties.stop_id,
        stopColor: busRoute.features[loop].properties.routes[0].route_color,
        stopName: "No Data",
        stopCoordinates: coordsSchema,
        coordsString:
          coordsSchema.lat.toFixed(8) + ":" + coordsSchema.lng.toFixed(8), // For removing duplicates
        zone_id: "No Data",
        location_type: 0,
        wheelchair_boarding: 0,
      })

      // Save the gtfsStopsSchema in the database
      gtfsStopSchema
        .save()
        .then(() => {
          // console.log("gtfsStopSchema collection saved successfully")
        })
        .catch((err) => {
          console.error(err)
        })
    }

    loop++
  } while (loop < busRoute.features.length)
}
