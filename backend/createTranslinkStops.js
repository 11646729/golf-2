import axios from "axios"
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

  // Now fetch the raw json file & decode it
  const rawjson = await axios({
    url: "http://localhost:5000/api/translinkTransport/createTranslinkStops",
    method: "get",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  const endloop = rawjson.data.features.length

  let loop = 0
  do {
    const coordsSchema = new CoordsSchema({
      lat: rawjson.data.features[loop].properties.Latitude,
      lng: rawjson.data.features[loop].properties.Longitude,
    })

    if (rawjson.data.features[loop].geometry.length > 1) {
      console.log("More than 1 point is stored for this feature")
    }

    console.log("Loop: ", loop)

    // Now create a model instance
    const busStop = new TranslinkStopSchema({
      databaseVersion: process.env.DATABASE_VERSION,
      agencyName: rawjson.data.features[loop].properties.DepotOpsArea,
      agencyId: "MET",
      markerType: rawjson.data.features[loop].geometry.type,
      stopKey: loop + 1,
      // stopCode: 0,
      stopId: rawjson.data.features[loop].properties.LocationID,
      stopColor: "#0093DD",
      stopName: rawjson.data.features[loop].properties.Stop_Name,
      stopCoordinates: coordsSchema,
      coordsString:
        coordsSchema.lat.toFixed(8) + ":" + coordsSchema.lng.toFixed(8), // For removing duplicates
      zone_id: rawjson.data.features[loop].properties.Fare_Stage,
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
