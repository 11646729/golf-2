import { TranslinkStopSchema } from "./models/transportModels/v1/translinkStopSchema"

// Function to save Translink busStop data to mongodb
// Longitude first in Javascript
export const saveTranslinkStopDataToDatabase = async () => {
  try {
    const geojson = require("./rawData/translink_bus_stop_list_january_2018.json")

    let i = 0
    do {
      // Now create a model instance
      const busStop = new TranslinkStopSchema({
        agency_key: "Translink Buses",
        stop_id: geojson.features[i].properties.LocationID,
        stop_code: "No data",
        stop_name: geojson.features[i].properties.Stop_Name,
        stop_desc: "No data",
        stop_lat: geojson.features[i].properties.Latitude,
        stop_lon: geojson.features[i].properties.Longitude,
        zone_id: geojson.features[i].properties.Fare_Stage,
        stop_url: "No data",
        location_type: 0,
        parent_station: "No data",
        stop_timezone: "Not required",
        wheelchair_boarding: 0,
      })

      // Now save in mongoDB
      busStop
        .save()
        // .then(() => console.log(i + " busStopsStations saved to mongoDB"))
        .catch((err) =>
          console.log("Error saving busStopsStations to mongoDB " + err)
        )

      i++
    } while (i < geojson.features.length)
    console.log("Import ended " + i)
  } catch (error) {
    // handle error
    console.log("Error in saveTranslinkStopDataToDatabase ", error)
  }
}
