import { GtfsShapesSchema } from "../models/transportModels/v1/gtfsShapesSchema"

// Function to save bus routes data to mongodb
// Longitude first in Javascript
export const saveTranslinkRouteDataToDatabase1 = async () => {
  console.log("In saveTranslinkRouteDataToDatabase1")
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
          shape_pt_sequence: j + 10000,
          shape_distance_travelled: 0.0,
        })

        // console.log(busShapes)

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
  console.log("In saveTranslinkRouteDataToDatabase2")
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
          shape_id: i + 20000,
          shape_pt_lat: geojson.features[i].geometry.coordinates[j][1],
          shape_pt_lon: geojson.features[i].geometry.coordinates[j][0],
          shape_pt_sequence: j + 1,
          shape_distance_travelled: 0.0,
        })

        // console.log(busShapes)

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
  console.log("In saveTranslinkRouteDataToDatabase3")
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
          shape_id: i + 30000,
          shape_pt_lat: geojson.features[i].geometry.coordinates[j][1],
          shape_pt_lon: geojson.features[i].geometry.coordinates[j][0],
          shape_pt_sequence: j + 1,
          shape_distance_travelled: 0.0,
        })

        // console.log(busShapes)

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
  console.log("In saveTranslinkRouteDataToDatabase4")
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
          shape_id: i + 40000,
          shape_pt_lat: geojson.features[i].geometry.coordinates[j][1],
          shape_pt_lon: geojson.features[i].geometry.coordinates[j][0],
          shape_pt_sequence: j + 1,
          shape_distance_travelled: 0.0,
        })

        // console.log(busShapes)

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

export const saveTranslinkRouteDataToDatabase5 = async () => {
  console.log("In saveTranslinkRouteDataToDatabase4")
  try {
    const geojson = require("../rawData/translink_ulsterbus_routes5.json")

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
          shape_id: i + 40000,
          shape_pt_lat: geojson.features[i].geometry.coordinates[j][1],
          shape_pt_lon: geojson.features[i].geometry.coordinates[j][0],
          shape_pt_sequence: j + 1,
          shape_distance_travelled: 0.0,
        })

        // console.log(busShapes)

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
