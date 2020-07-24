"use strict"

import { GtfsStopsSchema } from "../models/transportModels/v1/gtfsStopsSchema"
import { GtfsShapesSchema } from "../models/transportModels/v1/gtfsShapesSchema"
import { GtfsCoordsSchema } from "../models/commonModels/v1/gtfsCoordsSchema"

// Function to save bus stop data to mongodb
// Longitude first in Javascript
export const saveTranslinkStopsDataToDatabase = async () => {
  try {
    // const geojson = require("../rawData/translink_bus_stop_list_january_2018.json")
    const geojson = require("../rawData/translink_ulsterbus-routes.json")

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
export const saveTranslinkRouteDataToDatabase1 = async () => {
  try {
    const geojson = require("../rawData/translink_ulsterbus_routes1.json")

    let i = 0
    do {
      let j = 0
      do {
        // This creates the GTFS shapes.txt file
        // ------------------------------------------------------------
        // Now create a model instance
        const busShapes = new GtfsShapesSchema({
          databaseVersion: process.env.DATABASE_VERSION,
          agency_key: "Translink Buses",
          shape_id: i + 1,
          shape_pt_lat: geojson.features[i].geometry.coordinates[j][1],
          shape_pt_lon: geojson.features[i].geometry.coordinates[j][0],
          shape_pt_sequence: j + 1,
          shape_distance_travelled: 0.0,
        })

        console.log(busShapes)

        // Now save in mongoDB
        busShapes
          .save()
          // .then(() => console.log(i + " busShapes saved to mongoDB"))
          .catch((err) =>
            console.log("Error saving busShapes to mongoDB " + err)
          )

        j++
      } while (j < geojson.features[i].geometry.coordinates.length)

      i++
    } while (i < geojson.features.length)
    console.log("Import ended " + i)
  } catch (error) {
    // handle error
    console.log("Error in saveTranslinkRouteDataToDatabase ", error)
  }
}

export const saveTranslinkRouteDataToDatabase2 = async () => {
  try {
    const geojson = require("../rawData/translink_ulsterbus_routes2.json")

    let i = 0
    do {
      let j = 0
      do {
        // This creates the GTFS shapes.txt file
        // ------------------------------------------------------------
        // Now create a model instance
        const busShapes = new GtfsShapesSchema({
          databaseVersion: process.env.DATABASE_VERSION,
          agency_key: "Translink Buses",
          shape_id: i + 1,
          shape_pt_lat: geojson.features[i].geometry.coordinates[j][1],
          shape_pt_lon: geojson.features[i].geometry.coordinates[j][0],
          shape_pt_sequence: j + 1,
          shape_distance_travelled: 0.0,
        })

        console.log(busShapes)

        // Now save in mongoDB
        busShapes
          .save()
          // .then(() => console.log(i + " busShapes saved to mongoDB"))
          .catch((err) =>
            console.log("Error saving busShapes to mongoDB " + err)
          )

        j++
      } while (j < geojson.features[i].geometry.coordinates.length)

      i++
    } while (i < geojson.features.length)
    console.log("Import ended " + i)
  } catch (error) {
    // handle error
    console.log("Error in saveTranslinkRouteDataToDatabase ", error)
  }
}
export const saveTranslinkRouteDataToDatabase3 = async () => {
  try {
    const geojson = require("../rawData/translink_ulsterbus_routes3.json")

    let i = 0
    do {
      let j = 0
      do {
        // This creates the GTFS shapes.txt file
        // ------------------------------------------------------------
        // Now create a model instance
        const busShapes = new GtfsShapesSchema({
          databaseVersion: process.env.DATABASE_VERSION,
          agency_key: "Translink Buses",
          shape_id: i + 1,
          shape_pt_lat: geojson.features[i].geometry.coordinates[j][1],
          shape_pt_lon: geojson.features[i].geometry.coordinates[j][0],
          shape_pt_sequence: j + 1,
          shape_distance_travelled: 0.0,
        })

        console.log(busShapes)

        // Now save in mongoDB
        busShapes
          .save()
          // .then(() => console.log(i + " busShapes saved to mongoDB"))
          .catch((err) =>
            console.log("Error saving busShapes to mongoDB " + err)
          )

        j++
      } while (j < geojson.features[i].geometry.coordinates.length)

      i++
    } while (i < geojson.features.length)
    console.log("Import ended " + i)
  } catch (error) {
    // handle error
    console.log("Error in saveTranslinkRouteDataToDatabase ", error)
  }
}
export const saveTranslinkRouteDataToDatabase4 = async () => {
  try {
    const geojson = require("../rawData/translink_ulsterbus_routes4.json")

    let i = 0
    do {
      let j = 0
      do {
        // This creates the GTFS shapes.txt file
        // ------------------------------------------------------------
        // Now create a model instance
        const busShapes = new GtfsShapesSchema({
          databaseVersion: process.env.DATABASE_VERSION,
          agency_key: "Translink Buses",
          shape_id: i + 1,
          shape_pt_lat: geojson.features[i].geometry.coordinates[j][1],
          shape_pt_lon: geojson.features[i].geometry.coordinates[j][0],
          shape_pt_sequence: j + 1,
          shape_distance_travelled: 0.0,
        })

        console.log(busShapes)

        // Now save in mongoDB
        busShapes
          .save()
          // .then(() => console.log(i + " busShapes saved to mongoDB"))
          .catch((err) =>
            console.log("Error saving busShapes to mongoDB " + err)
          )

        j++
      } while (j < geojson.features[i].geometry.coordinates.length)

      i++
    } while (i < geojson.features.length)
    console.log("Import ended " + i)
  } catch (error) {
    // handle error
    console.log("Error in saveTranslinkRouteDataToDatabase ", error)
  }
}

// This creates the path used by a Polyline in GTFSTransportMap
// ------------------------------------------------------------
// let path = ""
// let tempPath1 = "["
// let tempPath2 = ""
// let tempPath3 = "]"
// let j = 0
// do {
//   tempPath2 =
//     "{ lat: " +
//     geojson.features[i].geometry.coordinates[j][1] +
//     ", lng: " +
//     geojson.features[i].geometry.coordinates[j][0] +
//     " },"

//   path = path + tempPath2
//   tempPath2 = ""

//   j++
// } while (j < geojson.features[i].geometry.coordinates.length)

// console.log(tempPath1 + path + tempPath3)
