const fs = require("fs")
import { CoordsSchema } from "./models/coordsSchema"
import { StopSchema } from "./models/stopSchema"

// -------------------------------------------------------
// Create Bus Stops in the Database
// Path: local function called in switchBoard
// -------------------------------------------------------
export const createStops = (req, res) => {
  try {
    const fileUrl = process.env.TRANSLINK_STOPS_FILE_URL
    const filePath = process.env.TRANSLINK_STOPS_FILEPATH
    const fileName = "FileName"
    const fileIndex = 0

    // Firstly read all existing Bus Stops in the file
    const data = fs.readFileSync(fileUrl, "utf8")

    // Then reduce and save individual Bus Stops in the database
    let numberOfStops = reduceStops(
      fileUrl,
      filePath,
      fileName,
      fileIndex,
      JSON.parse(data)
    )

    console.log("No of Stops successfully created: ", numberOfStops)

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
const reduceStops = (fileUrl, filePath, fileName, fileIndex, busStops) => {
  let numberOfStops = 0
  let loop = 0

  do {
    if (busStops.features[loop].geometry.type === "Point") {
      const coordsSchema = new CoordsSchema({
        lat: busStops.features[loop].properties.Latitude,
        lng: busStops.features[loop].properties.Longitude,
      })

      if (busStops.features[loop].geometry.length > 1) {
        console.log("More than 1 point is stored for this feature")
      }

      // Now create a model instance
      const busStop = new StopSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        stopFileUrl: fileUrl,
        stopFilePath: filePath,
        stopFileName: fileName,
        agencyName: busStops.features[loop].properties.DepotOpsArea,
        agencyId: "MET",
        markerType: busStops.features[loop].geometry.type,
        stopKey: loop + 1,
        stopCode: 0,
        stopId: busStops.features[loop].properties.LocationID,
        stopColor: "#0093DD",
        stopName: busStops.features[loop].properties.Stop_Name,
        stopCoordinates: coordsSchema,
        coordsString:
          coordsSchema.lat.toFixed(8) + ":" + coordsSchema.lng.toFixed(8), // For removing duplicates
        zone_id: busStops.features[loop].properties.Fare_Stage,
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
