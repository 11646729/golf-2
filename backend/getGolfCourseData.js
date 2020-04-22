"use strict"

// import axios from "axios"
import moment from "moment"
import { NearbyGolfCourses } from "./models/golfModels/v1/golfCourses"

const json = require("./nearbyGolfCourses.json")

// Function to save weather data to mongodb
export const saveGolfCourseDataToDatabase = async () => {
  try {
    // First import json file

    // Database version
    const database_version = process.env.DATABASE_VERSION

    let i = 0

    do {
      let location_name = json.features[i].properties.name
      let location_phone_number = json.features[i].properties.phoneNumber
      let location_latitude = json.features[i].geometry.coordinates[0]
      let location_longitude = json.features[i].geometry.coordinates[1]

      // // Home Coordinates in GeoJSON
      const location_coords = {
        type: "Golf Course",
        coordinates: [location_latitude, location_longitude],
      }

      // Now create a model instance
      const nearbyGolfCourses = new NearbyGolfCourses({
        database_version,
        location_name,
        location_coords,
        location_phone_number,
      })

      console.log(nearbyGolfCourses)

      i++
    } while (i < json.features.length)

    // Now save in mongoDB
    // nearbyGolfCourses.save()
  } catch (error) {
    // handle error
    console.log("Error in saveGolfCourseDataToDatabase ", error)
  }
}
