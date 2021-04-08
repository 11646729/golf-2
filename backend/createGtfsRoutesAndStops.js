const fs = require("fs")
const path = require("path")
// import { StopSchema } from "./models/transportModels/v1/stopSchema"
// import { RouteSchema } from "./models/transportModels/v1/routeSchema"
import { getAndParseSingleBusRouteAndStops } from "./getAndParseSingleBusRouteAndStops"

// -------------------------------------------------------
// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
// -------------------------------------------------------
export const createGtfsRoutesAndStops = async (req, res) => {
  // Firstly delete all existing Routes in the database
  // await RouteSchema.deleteMany({})
  //   .then((res) => {
  //     console.log("No of Routes successfully deleted: ", res.deletedCount)
  //   })
  //   .catch((err) => {
  //     console.log(err.message || "An error occurred while removing all Routes")
  //   })

  const filePath = process.env.HAMILTON_GEOJSON_FILES_PATH
  // const filePath = process.env.TFI_GEOJSON_FILES_PATH

  let totalRoutes = 0
  let totalStops = 0

  let arrayOfFiles = readBusRouteDirectory(filePath)

  // Now pass filePath, fileName & fileIndex to getSingleBusRouteAndStops
  let fileIndex = 0
  do {
    let fileName = arrayOfFiles[fileIndex]

    const returnValues = getAndParseSingleBusRouteAndStops(
      filePath,
      fileName,
      fileIndex
    )

    totalRoutes += returnValues[0]
    totalStops += returnValues[1]

    fileIndex++
  } while (fileIndex < arrayOfFiles.length)

  console.log("No of Routes successfully created: ", totalRoutes)
  console.log("No of Stops successfully created: ", totalStops)
}

// -------------------------------------------------------
// Local function
// -------------------------------------------------------
function readBusRouteDirectory(filePath) {
  let fileArray = []
  let files = fs.readdirSync(filePath)
  files.forEach((file) => {
    if (path.extname(file).toLowerCase() === ".geojson") fileArray.push(file)
  })
  return fileArray
}