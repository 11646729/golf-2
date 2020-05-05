"use strict"

import axios from "axios"
import { NearbyGolfCourses } from "./models/golfModels/v1/nearbyGolfCourses"

const json = require("./nearbyGolfCourses.json")

// Function to fetch nearby golf course data from the database
export const getNearbyGolfCourseDataFromDatabase = async () => {
  try {
    let nearbyGolfCourseUrl = process.env.NEARBY_GOLF_COURSE_URL

    // fetch data from the url endpoint & return it
    return await axios.get(nearbyGolfCourseUrl)
  } catch (error) {
    // handle error
    console.log("Error in getNearbyGolfCourseDataFromDatabase: ", error)
  }
}

// Function to emit nearby golf course data to be consumed by the client
export const emitNearbyGolfCourseData = async (
  socket,
  nearbyGolfCourseData
) => {
  try {
    await socket.emit("NearbyGolfCourseData", {
      // Time: darkSkiesData.data.currently.time,
      // Temperature: darkSkiesData.data.currently.temperature,
    })
  } catch (error) {
    // handle error
    console.log("Error in emitNearbyGolfCourseData: ", error)
  }
}

// Function to save nearby golf course data to mongodb
export const saveNearbyGolfCourseDataToDatabase = async () => {
  try {
    // Database version
    const database_version = process.env.DATABASE_VERSION

    let i = 0

    do {
      let location_name = json.features[i].properties.name
      let location_phone_number = json.features[i].properties.phoneNumber
      let location_latitude = json.features[i].geometry.coordinates[0]
      let location_longitude = json.features[i].geometry.coordinates[1]

      // Home Coordinates in GeoJSON
      const location_coords = {
        type: "Point",
        coordinates: [location_latitude, location_longitude],
      }

      // Now create a model instance
      const nearbyGolfCourses = new NearbyGolfCourses({
        database_version,
        location_name,
        location_coords,
        location_phone_number,
      })

      //      console.log(nearbyGolfCourse)

      // Now save in mongoDB
      nearbyGolfCourses.save()

      i++
    } while (i < json.features.length)
  } catch (error) {
    // handle error
    console.log("Error in saveNearbyGolfCourseDataToDatabase ", error)
  }
}
