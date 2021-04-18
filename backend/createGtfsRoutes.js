const fs = require("fs")
const path = require("path")
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
import { RouteSchema } from "./models/transportModels/v1/routeSchema"
import { readRouteDirectory, readRouteFile } from "./fileUtilities"

// -------------------------------------------------------
// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
// -------------------------------------------------------
export const createGtfsRoutes = () => {
  // let fileFetch = []

  // const dirPath = process.env.HAMILTON_GEOJSON_FILES_PATH
  const dirPath = process.env.TFI_GEOJSON_FILES_PATH

  // Store filenames in array from directory with type .geojson
  let arrayOfFiles = readRouteDirectory(dirPath, ".geojson")

  // -----------------------------------------------------
  // Divide into pieces to prevent timeout error
  // let loop = 0
  // let start = 0 // fileFetch[0]
  // let startIteration = 0
  // let endIteration = 0
  // let iterationSize = 100
  // let end = arrayOfFiles.length
  // let iterations = Math.floor(end / iterationSize)

  // console.log("Start of files: ", start)
  // console.log("Number of files: ", end)

  // if (iterations > 0) {
  //   do {
  //     if (loop === 0) {
  //       startIteration = start
  //       endIteration = iterationSize - 1
  //     } else {
  //       startIteration = loop * iterationSize
  //       if (loop < iterations) {
  //         endIteration = (loop + 1) * iterationSize - 1
  //       } else {
  //         endIteration = end
  //       }
  //     }

  //     console.log("Iteration Start: ", startIteration)
  //     console.log("Iteration End: ", endIteration)

  //     loop++
  //   } while (loop <= iterations)
  // } else {
  //   startIteration = start
  //   endIteration = end
  // }
  // --------------------------------------------------------

  let fileFetch = prepReadGtfsFile(0, 100, dirPath, arrayOfFiles)
  // console.log(fileFetch)

  let totalRoutes = 0

  // Now pass dirPath, fileName & fileIndex to createGtfsRoutes
  let fileIndex = 0
  let maxFiles = 100

  do {
    let fileName = arrayOfFiles[fileIndex]

    // totalRoutes += createGtfsRoutes2(dirPath, fileName, fileIndex)

    fileIndex++
    // } while (fileIndex < maxFiles)
  } while (fileIndex < arrayOfFiles.length)

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

// -------------------------------------------------------
// Local function to read a set of files in a directory
// -------------------------------------------------------
function prepReadGtfsFile(firstFile, iterationSize, dirPath, arrayOfFiles) {
  let fileFetchArray = []
  let fileFetch = []

  // Divide into pieces to prevent timeout error
  let loop = 0
  let start = 0
  let startIteration = 0 // fileFetch[0]
  let endIteration = 0 // fileFetch[1]
  let end = arrayOfFiles.length // fileFetch[2]
  let iterations = Math.floor(end / iterationSize)

  console.log("Start of files: ", start)
  console.log("Number of files: ", end)

  if (iterations > 0) {
    do {
      if (loop === 0) {
        startIteration = start
        endIteration = iterationSize - 1
      } else {
        startIteration = loop * iterationSize
        if (loop < iterations) {
          endIteration = (loop + 1) * iterationSize - 1
        } else {
          endIteration = end
        }
      }

      loop++

      fileFetch.push(startIteration)
      fileFetch.push(endIteration)

      // console.log("Iteration Start: ", startIteration)
      // console.log("Iteration End: ", endIteration)

      fileFetchArray.push(fileFetch)
      fileFetch = []

      if (loop > iterations) {
        console.log(fileFetchArray)
      }
    } while (loop <= iterations)
  } else {
    startIteration = start
    endIteration = end

    fileFetch.push(startIteration)
    fileFetch.push(endIteration)

    fileFetchArray.push(fileFetch)

    console.log(fileFetchArray)
  }

  return fileFetchArray
}
