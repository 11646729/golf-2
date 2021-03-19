const fs = require("fs")
const path = require("path")
import { GtfsStopSchema } from "./models/transportModels/v1/gtfsStopSchema"
import { GtfsRouteSchema } from "./models/transportModels/v1/gtfsRouteSchema"
import { getAndParseSingleBusRouteAndStops } from "./getAndParseSingleBusRouteAndStops"

// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
export const createGtfsRoutesAndGtfsStops = async (req, res) => {
  // Firstly delete all existing Routes in the database
  await GtfsRouteSchema.deleteMany({})
    .then((res) => {
      console.log("No of Routes successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message || "An error occurred while removing all Routes")
    })

  // Firstly delete all existing Stops in the database
  await GtfsStopSchema.deleteMany({})
    .then((res) => {
      console.log("No of Stops successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message || "An error occurred while removing all Stops")
    })

  const routeFilePath = process.env.HAMILTON_GEOJSON_FILES_PATH
  // const routeFilePath = process.env.TFI_GEOJSON_FILES_PATH

  let returnValues = 0

  fs.readdir(routeFilePath, function (err, files) {
    const arrayOfFiles = files.filter(function (e) {
      return path.extname(e).toLowerCase() === ".geojson"
    })
    if (err) {
      throw err
    }

    // Now pass filePath, fileName & index to getSingleBusRouteAndStops
    let index = 0
    do {
      let fileName = arrayOfFiles[index]

      returnValues = getAndParseSingleBusRouteAndStops(
        filePath,
        fileName,
        index
      )

      // Promise.resolve(returnValues).then(function (value) {
      //   console.log("Stops created: ", value) // "Success"
      // })

      index++
    } while (index < arrayOfFiles.length)
  })
}
