import { TranslinkStopSchema } from "./models/transportModels/v1/translinkStopSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// Function to save Translink busStop data to mongodb
// Longitude first in Javascript
export const createTranslinkStops = async () => {
  console.log("In importTranslinkStopData")

  try {
    const rawjson = require("./rawData/translink_bus_stop_list_january_2018.json")

    let i = 0
    do {
      const coordsSchema = new CoordsSchema({
        lat: rawjson.features[i].properties.Latitude,
        lng: rawjson.features[i].properties.Longitude,
      })

      // Now create a model instance
      const busStop = new TranslinkStopSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        agencyName: rawjson.features[i].properties.DepotOpsArea,
        markerType: "Point",
        stopKey: i,
        stopCode: 0,
        stopId: rawjson.features[i].properties.LocationID,
        stopColor: "#0093DD",
        stopName: rawjson.features[i].properties.Stop_Name,
        stopCoordinates: coordsSchema,
        zone_id: rawjson.features[i].properties.Fare_Stage,
        location_type: 0,
        wheelchair_boarding: 0,
      })

      // Now save in mongoDB
      busStop
        .save()
        // .then(() => console.log(i + " busStops saved to mongoDB"))
        .catch((err) => console.log("Error saving busStops to mongoDB " + err))

      i++
    } while (i < rawjson.features.length)
    console.log("Import ended " + i)
  } catch (error) {
    // handle error
    console.log("Error in importTranslinkStopData ", error)
  }
}
