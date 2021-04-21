const fs = require("fs")
const path = require("path")
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
import { RouteSchema } from "./models/transportModels/v1/routeSchema"
import {
  readRouteDirectory,
  readRouteFile,
  prepReadGtfsFile,
} from "./fileUtilities"

// -------------------------------------------------------
// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
// -------------------------------------------------------
export const createGtfsRoutes = () => {
  // const dirPath = process.env.HAMILTON_GEOJSON_FILES_PATH
  const dirPath = process.env.TFI_GEOJSON_FILES_PATH

  let totalRoutes = 0

  // Store filenames in array from directory with type .geojson
  let arrayOfFiles = readRouteDirectory(dirPath, ".geojson")

  let fileFetch = prepReadGtfsFile(0, 100, arrayOfFiles.length)

  let loop = 0
  do {
    console.log("From: ", fileFetch[loop][0])
    console.log("To: ", fileFetch[loop][1])
    // console.log("No of Iterations: ", fileFetch[loop][2])

    let fileIndex = fileFetch[loop][0]

    do {
      let fileName = arrayOfFiles[fileIndex]

      totalRoutes += createGtfsRoutes2(dirPath, fileName, fileIndex)

      fileIndex++
    } while (fileIndex <= fileFetch[loop][1])

    loop++
  } while (loop <= 1)
  // fileFetch[0][2])

  // TODO - Renumber routeKey & stopKey

  console.log("No of Routes successfully created: ", totalRoutes)
}

// -------------------------------------------------------
// Function to fetch data from a single GeoJson route file
// This routine is called from the individual route button
// -------------------------------------------------------
function createGtfsRoutes2(dirPath, fileName, fileIndex) {
  const fileUrl = dirPath + fileName

  const busRoute = readRouteFile(fileUrl)

  let numberOfRoutes = 0

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

      // And save it in a routeSchema collection
      const routeSchema = new RouteSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        routeFilePath: dirPath,
        routeFileUrl: fileUrl,
        routeVisible: false,
        agencyName: busRoute.features[loop].properties.agency_name,
        agencyId: busRoute.features[loop].properties.agency_id,
        markerType: busRoute.features[loop].geometry.type,
        routeKey: fileIndex * 1000 + loop,
        routeColor: busRoute.features[loop].properties.route_color,
        routeLongName: busRoute.features[loop].properties.route_long_name,
        routeNumber: busRoute.features[loop].properties.route_short_name,
        routeCoordinates: googleMapsCoords,
      })

      // Save the routeSchema in the database
      routeSchema.save().catch((err) => {
        console.log("Error saving Routes to database ", err)
      })

      // Increment Number of Routes created
      numberOfRoutes++
    }

    loop++
  } while (loop < busRoute.features.length)

  return numberOfRoutes
}
