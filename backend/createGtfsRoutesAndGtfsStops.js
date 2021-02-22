const fs = require("fs")
const path = require("path")
import { GtfsStopSchema } from "./models/transportModels/v1/gtfsStopSchema"
import { GtfsRouteSchema } from "./models/transportModels/v1/gtfsRouteSchema"
import { getSingleBusRouteAndStops } from "./getSingleBusRouteAndStops"

// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
export const createGtfsRoutesAndGtfsStops = async (req, res) => {
  // Firstly delete all existing Routes in the database
  GtfsRouteSchema.deleteMany({})
    .then((res) => {
      console.log("No of Routes successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message || "An error occurred while removing all Routes")
    })

  // Firstly delete all existing Stops in the database
  GtfsStopSchema.deleteMany({})
    .then((res) => {
      console.log("No of Stops successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message || "An error occurred while removing all Stops")
    })

  const geojsonDirectory = process.env.GEOJSON_FILES_PATH

  fs.readdir(geojsonDirectory, function (err, files) {
    var filesList = files.filter(function (e) {
      return path.extname(e).toLowerCase() === ".geojson"
    })
    if (err) {
      throw err
    }

    // Now pass a single GeoJson route filename to getSingleBusRouteAndStops
    let i = 0
    do {
      let singleRouteFilename = filesList[i]

      getSingleBusRouteAndStops(singleRouteFilename)

      i++
    } while (i < filesList.length)
  })
}
