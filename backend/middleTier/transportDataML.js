"use strict"

import { StopsStationsSchema } from "../models/transportModels/v1/stopsStationsSchema"
import { GtfsCoordsSchema } from "../models/commonModels/v1/gtfsCoordsSchema"

// Function to save bus stop data to mongodb
// Longitude first in Javascript
export const saveTransportDataToDatabase = async () => {
  try {
    const geojson = require("../translink_bus_stop_test_list.json")

    let i = 0
    do {
      const busStopCoords = new GtfsCoordsSchema({
        stop_lat: geojson.features[i].properties.Latitude,
        stop_lon: geojson.features[i].properties.Longitude,
      })

      console.log(busStopCoords)

      // Now create a model instance
      const busStop = new StopsStationsSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        stop_id: geojson.features[i].properties.LocationID,
        stop_code: "No data",
        stop_name: geojson.features[i].properties.Stop_Name,
        stop_desc: "No data",
        stop_coordinates: busStopCoords,
        zone_id: geojson.features[i].properties.Fare_Stage,
        stop_url: "No data",
        location_type: 0,
        parent_station: "No data",
        stop_timezone: "Not Required",
        wheelchair_boarding: 0,
      })

      //     // Now save in mongoDB
      busStop
        .save()
        // .then(() => console.log(i + " busStopsStations saved to mongoDB"))
        .catch((err) =>
          console.log("Error saving busStopsStations to mongoDB " + err)
        )

      i++
    } while (i < geojson.features.length)
  } catch (error) {
    // handle error
    console.log("Error in saveTransportDataToDatabase ", error)
  }
}
