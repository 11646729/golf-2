import { GtfsReducedRoutesSchema } from "./models/transportModels/v1/gtfsReducedRoutesSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// Function to extract data for reduced dataset then save it in the mongodb database
export const reduceSaveBusRoute = async (busRoute) => {
  console.log("Extract data for reduced dataset")

  let loop = 0
  do {
    if (busRoute.features[loop].geometry.type === "LineString") {
      // step 1: Change order of coordinates
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

      // And save it in a gtfsReducedSRouteLineStringSchema collection
      const gtfsReducedRoutesSchema = new GtfsReducedRoutesSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        markerType: busRoute.features[loop].geometry.type,
        shapeKey: loop,
        routeColor: busRoute.features[loop].properties.route_color,
        routeLongName: busRoute.features[loop].properties.route_long_name,
        routeShortName: busRoute.features[loop].properties.route_short_name,
        shapeCoordinates: googleMapsCoords,
      })

      // Save the reducedShapes in the database
      gtfsReducedRoutesSchema
        .save()
        .then(() => {
          console.log("gtfsReducedRouteSchema collection saved successfully")
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

      // And save it in a gtfsReducedSRouteLineStringSchema collection
      const gtfsReducedRoutesSchema = new GtfsReducedRoutesSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        markerType: busRoute.features[loop].geometry.type,
        shapeKey: loop,
        routeColor: busRoute.features[loop].properties.routes[0].route_color,
        routeLongName:
          busRoute.features[loop].properties.routes[0].route_long_name,
        routeShortName:
          busRoute.features[loop].properties.routes[0].route_short_name,
        shapeCoordinates: coordsSchema,
      })

      console.log(gtfsReducedRoutesSchema)

      //   let markerType = busRoute.features[loop].geometry.type
      //   let routeKey = index
      //   let stopName = busRoute.features[loop].properties.stop_name
      //   let stopCoords = busRoute.features[loop].geometry.coordinates
      //   let googleMapsCoords = [
      //     busRoute.features[loop].geometry.coordinates[1],
      //     busRoute.features[loop].geometry.coordinates[0],
      //   ]
      //   // }

      // console.log(loop)
    }

    loop++
  } while (loop < busRoute.features.length)
}
