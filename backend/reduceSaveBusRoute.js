import { GtfsReducedRouteLineStringSchema } from "./models/transportModels/v1/gtfsReducedRouteSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// Function to extract data for reduced dataset then save it in the mongodb database
export const reduceSaveBusRoute = async (busRoute, index) => {
  console.log("Extract data for reduced dataset")

  let loop = 0
  do {
    if (busRoute.features[loop].geometry.type === "LineString") {
      // console.log("LineString")

      // Change order of coordinates
      let i = 0
      let googleMapsCoords = []
      let tempCoords = []
      do {
        tempCoords = [
          busRoute.features[loop].geometry.coordinates[i][1],
          busRoute.features[loop].geometry.coordinates[i][0],
        ]
        googleMapsCoords.push(tempCoords)

        tempCoords = []
        i++
      } while (i < busRoute.features[loop].geometry.coordinates.length)

      // And save it in a gtfsReducedShapesSchema collection
      const gtfsReducedRouteSchema = new GtfsReducedRouteLineStringSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        markerType: busRoute.features[loop].geometry.type,
        routeKey: index,
        routeColor: busRoute.features[loop].properties.route_color,
        routeLongName: busRoute.features[loop].properties.route_long_name,
        routeShortName: busRoute.features[loop].properties.route_short_name,
        // shapeCoordinates: googleMapsCoords,
      })

      // Save the reducedShapes in the database
      gtfsReducedRouteSchema
        .save()
        .then(() => {
          console.log("gtfsReducedRouteSchema collection saved successfully")
        })
        .catch((err) => {
          console.error(err)
        })
    }

    // if (busRoute.features[loop].geometry.type === "Point") {
    //   console.log("Point")

    //   // let info = {
    //   let markerType = busRoute.features[loop].geometry.type
    //   let routeKey = index
    //   let stopName = busRoute.features[loop].properties.stop_name
    //   let stopCoords = busRoute.features[loop].geometry.coordinates
    //   let googleMapsCoords = [
    //     busRoute.features[loop].geometry.coordinates[1],
    //     busRoute.features[loop].geometry.coordinates[0],
    //   ]
    //   // }
    //   console.log(googleMapsCoords)
    // }

    loop++
  } while (loop < busRoute.features.length)

  console.log("Index is: " + index)
}
