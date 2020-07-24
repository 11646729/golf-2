"use strict"

import { GtfsStopsSchema } from "../models/transportModels/v1/gtfsStopsSchema"
import { GtfsCoordsSchema } from "../models/commonModels/v1/gtfsCoordsSchema"

// Function to save bus stop data to mongodb
// Longitude first in Javascript
export const saveTranslinkStopsDataToDatabase = async () => {
  try {
    const geojson = require("../rawData/translink_bus_stop_list_january_2018.json")

    let i = 0
    do {
      const busStopCoords = new GtfsCoordsSchema({
        lat: geojson.features[i].properties.Latitude,
        lng: geojson.features[i].properties.Longitude,
      })

      // Now create a model instance
      const busStop = new GtfsStopsSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        agency_key: "Translink Buses",
        stop_id: geojson.features[i].properties.LocationID,
        stop_code: "No data",
        stop_name: geojson.features[i].properties.Stop_Name,
        stop_desc: "No data",
        stop_coordinates: busStopCoords,
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
    console.log("Error in saveTransportDataToDatabase ", error)
  }
}

// Function to save bus routes data to mongodb
// Longitude first in Javascript
export const saveTranslinkRouteDataToDatabase = async () => {
  try {
    const geojson = require("../rawData/translink_ulsterbus-routes.json")

    // console.log(geojson.features[0].geometry)

    let i = 0
    do {
      // const routePathCoords = new GtfsCoordsSchema({
      //   lat: geojson.features[i].geometry.coordinates,
      //   lng: geojson.features[i].geometry.coordinates,
      // })

      // console.log(geojson.features[i].geometry.coordinates.length)

      let path = ""
      let tempPath1 = "path={["
      let tempPath2 = ""
      let tempPath3 = "]}"
      let j = 0
      do {
        tempPath2 =
          "{ lat: " +
          geojson.features[i].geometry.coordinates[j][1] +
          ", lng: " +
          geojson.features[i].geometry.coordinates[j][0] +
          " },"

        path = path + tempPath2
        tempPath2 = ""

        j++
      } while (j < geojson.features[i].geometry.coordinates.length)

      console.log(tempPath1 + path + tempPath3)

      // Now create a model instance
      // const busSRoute = new GtfsStopsSchema({
      //   databaseVersion: process.env.DATABASE_VERSION,
      //   agency_key: "Translink Buses",
      //   stop_id: geojson.features[i].properties.LocationID,
      //   stop_code: "No data",
      //   stop_name: geojson.features[i].properties.Stop_Name,
      //   stop_desc: "No data",
      //   stop_coordinates: busStopCoords,
      //   zone_id: geojson.features[i].properties.Fare_Stage,
      //   stop_url: "No data",
      //   location_type: 0,
      //   parent_station: "No data",
      //   stop_timezone: "Not required",
      //   wheelchair_boarding: 0,
      // })

      // Now save in mongoDB
      // busRoute
      //   .save()
      //   // .then(() => console.log(i + " busRoutes saved to mongoDB"))
      //   .catch((err) => console.log("Error saving busRoutes to mongoDB " + err))

      i++
    } while (i < geojson.features.length)
    console.log("Import ended " + i)
  } catch (error) {
    // handle error
    console.log("Error in saveTransportDataToDatabase ", error)
  }
}
