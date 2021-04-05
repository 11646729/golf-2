const fs = require("fs")
import { StopSchema } from "./models/transportModels/v1/stopSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// -------------------------------------------------------
// Create Bus Stops in the Database
// Path: local function called in switchBoard
// -------------------------------------------------------
export const createStops = async (req, res) => {
  // Firstly delete all existing Bus Stops in the database
  await StopSchema.deleteMany({})
    .then((res) => {
      console.log("No of Stops successfully deleted: ", res.deletedCount)

      fs.readFile(process.env.TRANSLINK_STOPS_FILEPATH, "utf8", (err, data) => {
        if (err) {
          throw err
        }

        reduceStops(JSON.parse(data))
      })
    })
    .catch((err) => {
      console.log(err.message)
    })
}

// -------------------------------------------------------
// Function to extract data for reduced dataset then save it in the mongodb database
// -------------------------------------------------------
const reduceStops = (busStops) => {
  const endloop = busStops.features.length

  let loop = 0
  do {
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
      agencyName: busStops.features[loop].properties.DepotOpsArea,
      agencyId: "MET",
      markerType: busStops.features[loop].geometry.type,
      stopKey: loop + 1,
      // stopCode: 0,
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
      .catch((err) => console.log("Error saving Bus Stops to database " + err))

    loop++
  } while (loop < endloop)

  console.log("No of new Bus Stops created & saved: ", loop)
}
