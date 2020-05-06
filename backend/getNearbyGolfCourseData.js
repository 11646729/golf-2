"use strict"

import axios from "axios"
// import {
//   headerCrsPropertiesGolfCourse,
//   headerCrsGolfCourse,
//   headerGolfCourse,
//   featuresLocationGolfCourse,
//   featuresPropertyGolfCourse,
//   featuresGolfCourse,}

import { featuresGolfCourse } from "./models/golfModels/v1/nearbyGolfCourse"
import { NearbyGolfCourse } from "./models/golfModels/v1/nearbyGCSchema"

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

    let type = json.type
    let crs = json.crs

    console.log(type, crs)

    const test = new featuresGolfCourse({})

    const nearbyGolfCourse = new NearbyGolfCourse({
      type,
      header,
    })

    let featuresArray = []

    let i = 0

    do {
      // let type = json.type
      // let header = json.header
      // let feature = json.features[i]

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
      const nearbyCourses = new nearbyGolfCourses({
        // database_version,
        location_name,
        location_coords,
        location_phone_number,
      })

      console.log("NearbyGolfCourses: " + nearbyCourses)

      // console.log(json)
      // console.log(nearbyGolfCourses)

      // Now save in mongoDB
      // nearbyGolfCourses.save()

      i++
    } while (i < json.features.length)

    console.log("Features array: " + featuresArray)
  } catch (error) {
    // handle error
    console.log("Error in saveNearbyGolfCourseDataToDatabase ", error)
  }
}
