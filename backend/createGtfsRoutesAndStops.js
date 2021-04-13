const fs = require("fs")
const path = require("path")
import { createGtfsRoutes } from "./createGtfsRoutes"
import { createGtfsStops } from "./createGtfsStops"

// -------------------------------------------------------
// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
// -------------------------------------------------------
export const createGtfsRoutesAndStops = async (req, res) => {
  const filePath = process.env.HAMILTON_GEOJSON_FILES_PATH
  // const filePath = process.env.TFI_GEOJSON_FILES_PATH

  let totalRoutes = 0
  let totalStops = 0

  let arrayOfFiles = readBusRouteDirectory(filePath)

  // Now pass filePath, fileName & fileIndex to createGtfsRoutes & createGtfsStops
  let fileIndex = 0
  let maxFiles = 100
  do {
    let fileName = arrayOfFiles[fileIndex]

    totalRoutes += createGtfsRoutes(filePath, fileName, fileIndex)
    totalStops += createGtfsStops(filePath, fileName, fileIndex)

    fileIndex++
    // } while (fileIndex < maxFiles)
  } while (fileIndex < arrayOfFiles.length)

  // TODO - Renumber routeKey & stopKey

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
