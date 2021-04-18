const fs = require("fs")
const path = require("path")
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
import { StopSchema } from "./models/transportModels/v1/stopSchema"
import { readRouteDirectory } from "./fileUtilities"

// -------------------------------------------------------
// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
// -------------------------------------------------------
export const createGtfsStops = (req, res) => {
  const dirPath = process.env.HAMILTON_GEOJSON_FILES_PATH
  // const dirPath = process.env.TFI_GEOJSON_FILES_PATH

  let totalStops = 0

  // Store filenames in array from directory with type .geojson
  let arrayOfFiles = readRouteDirectory(dirPath, ".geojson")

  // Now pass filePath, fileName & fileIndex to createGtfsStops
  let fileIndex = 0
  // let maxFiles = 100
  do {
    let fileName = arrayOfFiles[fileIndex]

    totalStops += createGtfsStops2(dirPath, fileName, fileIndex)

    fileIndex++
    // } while (fileIndex < maxFiles)
  } while (fileIndex < arrayOfFiles.length)

  // TODO - Renumber routeKey & stopKey

  console.log("No of Stops successfully created: ", totalStops)
}

// -------------------------------------------------------
// Function to fetch data from a single GeoJson route file
// This routine is called from the individual route button
// -------------------------------------------------------
function createGtfsStops2(dirPath, fileName, fileIndex) {
  try {
    const fileUrl = dirPath + fileName

    // Firstly read all existing Bus Stops in the file
    const data = fs.readFileSync(fileUrl, "utf8")

    // Then reduce and save individual Bus Stops in the database
    let numberOfStops = reduceGtfsStops(
      fileUrl,
      dirPath,
      fileName,
      fileIndex,
      JSON.parse(data)
    )

    return numberOfStops
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("File not found!")
    } else {
      throw err
    }
  }
}

// -------------------------------------------------------
// Function to extract data for reduced dataset then save it in the mongodb database
// -------------------------------------------------------
const reduceGtfsStops = (fileUrl, dirPath, fileName, fileIndex, busStops) => {
  let numberOfStops = 0
  let loop = 0

  do {
    if (busStops.features[loop].geometry.type === "Point") {
      const coordsSchema = new CoordsSchema({
        lat: busStops.features[loop].geometry.coordinates[1],
        lng: busStops.features[loop].geometry.coordinates[0],
      })

      if (busStops.features[loop].geometry.length > 1) {
        console.log("More than 1 point is stored for this feature")
      }

      // Now create a model instance
      const busStop = new StopSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        stopFileUrl: fileUrl,
        stopFilePath: dirPath,
        stopFileName: fileName,
        agencyName: busStops.features[loop].properties.agency_name,
        agencyId: busStops.features[loop].properties.routes[0].agency_id,
        markerType: busStops.features[loop].geometry.type,
        stopKey: fileIndex * 1000 + loop,
        stopCode: busStops.features[loop].properties.stop_code,
        stopId: busStops.features[loop].properties.stop_id,
        stopColor: busStops.features[loop].properties.routes[0].route_color,
        stopName: "No Data",
        stopCoordinates: coordsSchema,
        coordsString:
          coordsSchema.lat.toFixed(8) + ":" + coordsSchema.lng.toFixed(8), // For removing duplicates
        zone_id: "No Data",
        location_type: 0,
        wheelchair_boarding: 0,
      })

      // Now save in mongoDB
      busStop
        .save()
        .catch((err) =>
          console.log("Error saving Bus Stops to database " + err)
        )

      // Increment Number of Stops created
      numberOfStops++
    }

    loop++
  } while (loop < busStops.features.length)

  return numberOfStops
}
