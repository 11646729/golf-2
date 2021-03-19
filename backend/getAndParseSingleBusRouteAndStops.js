const fs = require("fs")
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
import { GtfsRouteSchema } from "./models/transportModels/v1/gtfsRouteSchema"
import { GtfsStopSchema } from "./models/transportModels/v1/gtfsStopSchema"

// Function to fetch data from a single GeoJson route file
// This routine is called from the individual route button
// -------------------------------------------------------
export const getAndParseSingleBusRouteAndStops = async (
  routeFilePath,
  routeFileName,
  outerLoop
) => {
  const fileUrl = routeFilePath + routeFileName

  let promiseResult = 0
  let passedResult = 0

  fs.readFile(fileUrl, "utf8", (err, data) => {
    if (err) {
      //   console.log("Error fetching data from a single geojson file")
      throw err
    }

    let busRoute = JSON.parse(data)

    let reducedRoute = outerLoop * 1000
    let numberOfStops = 0

    let innerLoop = 0
    do {
      if (busRoute.features[innerLoop].geometry.type === "LineString") {
        // Change order of coordinates
        let i = 0
        let googleMapsCoords = []
        do {
          const coordsSchema = new CoordsSchema({
            lat: busRoute.features[innerLoop].geometry.coordinates[i][1],
            lng: busRoute.features[innerLoop].geometry.coordinates[i][0],
          })

          googleMapsCoords.push(coordsSchema)

          i++
        } while (i < busRoute.features[innerLoop].geometry.coordinates.length)

        // And save it in a gtfsRouteSchema collection
        const gtfsRouteSchema = new GtfsRouteSchema({
          databaseVersion: process.env.DATABASE_VERSION,
          routeFilePath: routeFilePath,
          routeFileUrl: routeFilePath + routeFileName,
          routeVisible: false,
          agencyName: busRoute.features[innerLoop].properties.agency_name,
          agencyId: busRoute.features[innerLoop].properties.agency_id,
          markerType: busRoute.features[innerLoop].geometry.type,
          routeKey: reducedRoute + innerLoop,
          routeColor: busRoute.features[innerLoop].properties.route_color,
          routeLongName:
            busRoute.features[innerLoop].properties.route_long_name,
          routeNumber: busRoute.features[innerLoop].properties.route_short_name,
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

      if (busRoute.features[innerLoop].geometry.type === "Point") {
        const coordsSchema = new CoordsSchema({
          lat: busRoute.features[innerLoop].geometry.coordinates[1],
          lng: busRoute.features[innerLoop].geometry.coordinates[0],
        })

        // And save it in a gtfsStopsSchema collection
        const gtfsStopSchema = new GtfsStopSchema({
          databaseVersion: process.env.DATABASE_VERSION,
          stopFilePath: routeFilePath,
          stopFileUrl: routeFilePath + routeFileName,
          agencyName: busRoute.features[innerLoop].properties.agency_name,
          agencyId: busRoute.features[innerLoop].properties.routes[0].agency_id,
          markerType: busRoute.features[innerLoop].geometry.type,
          stopKey: reducedRoute + innerLoop,
          stopCode: busRoute.features[innerLoop].properties.stop_code,
          stopId: busRoute.features[innerLoop].properties.stop_id,
          stopColor:
            busRoute.features[innerLoop].properties.routes[0].route_color,
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
        // Increment Number of Stops
        numberOfStops++
      }

      innerLoop++
    } while (innerLoop < busRoute.features.length)

    // ==========================================================================================

    // console.log("promiseResult: ", promiseResult)

    // Promise.resolve(promiseResult).then(function (value) {
    //   // console.log("getSingleBusRouteAndStops: ", value)
    //   passedResult = value
    //   // console.log("passedResult: ", passedResult)
    //   // return value
    // })
    // console.log("passedResult: ", passedResult)
  })

  //   function getValues() {
  //     return [getFirstValue(), getSecondValue()];
  // }
  // Then you can access them like so:

  // var values = getValues();
  // var first = values[0];
  // var second = values[1];

  // With the latest ECMAScript 6 syntax*, you can also destructure the return value more intuitively:

  // const [first, second] = getValues();

  return promiseResult
}
