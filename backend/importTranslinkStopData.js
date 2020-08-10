import { TranslinkStopSchema } from "./models/transportModels/v1/translinkStopSchema"

// Function to save Translink busStop data to mongodb
// Longitude first in Javascript
export const importTranslinkStopData = async () => {
  try {
    const rawjson = require("./rawData/translink_bus_stop_list_january_2018.json")

    let i = 0
    do {
      // Now create a model instance
      const busStop = new TranslinkStopSchema({
        agency_key: "Translink Buses",
        stop_id: rawjson.features[i].properties.LocationID,
        stop_code: "No data",
        stop_name: rawjson.features[i].properties.Stop_Name,
        stop_desc: "No data",
        stop_lat: rawjson.features[i].properties.Latitude,
        stop_lon: rawjson.features[i].properties.Longitude,
        zone_id: rawjson.features[i].properties.Fare_Stage,
        stop_url: "No data",
        location_type: 0,
        parent_station: "No data",
        stop_timezone: "Not required",
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
