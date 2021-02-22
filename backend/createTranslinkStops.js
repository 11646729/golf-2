const fs = require("fs")
import { TranslinkStopSchema } from "./models/transportModels/v1/translinkStopSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// Function to save Translink busStop data to mongodb
// Longitude first in Javascript
export const createTranslinkStops = async () => {
  // Firstly delete all existing Stops in the database
  TranslinkStopSchema.deleteMany({})
    .then((res) => {
      console.log("No of Stops successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message || "An error occurred while removing all Stops")
    })

  const rawGeojson = "./rawData/translink_bus_stop_list_january_2018.json"

  fs.readFile(rawGeojson, "utf8", (err, data) => {
    if (err) {
      throw err
    }

    reduceTranslinkStops(JSON.parse(data))
  })
}

// Function to extract data for reduced dataset then save it in the mongodb database
const reduceTranslinkStops = async (busStops) => {
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

    console.log("Loop: ", loop)

    // Now create a model instance
    const busStop = new TranslinkStopSchema({
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
      .then(() => console.log(loop + " busStops saved to mongoDB"))
      .catch((err) => console.log("Error saving busStops to mongoDB " + err))

    loop++
  } while (loop < endloop)
}
