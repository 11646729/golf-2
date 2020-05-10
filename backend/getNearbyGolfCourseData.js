"use strict"

import axios from "axios"
import { NearbyGolfCourseSchema } from "./models/golfModels/v1/nearbyGolfCourseSchema"
import { GolfCourseDetailsSchema } from "./models/golfModels/v1/golfCourseDetailsSchema"
import { GolfCourseLocationSchema } from "./models/golfModels/v1/golfCourseLocationSchema"

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
// Longitude first in Javascript
export const saveNearbyGolfCourseDataToDatabase = async () => {
  try {
    const nearbyGolfCourse = new NearbyGolfCourseSchema({
      databaseVersion: process.env.DATABASE_VERSION,
      type: "FeatureCollection",
      crsName: "WGS84",
      crsUrn: "urn:ogc:def:crs:OGC:1.3:CRS84",
    })

    let i = 0
    do {
      // NB Coordinates in GeoJSON order - Longitude then Latitude
      const golfCourseLocation = new GolfCourseLocationSchema({
        type: "Point",
        coordinates: [
          json.features[i].geometry.coordinates[1],
          json.features[i].geometry.coordinates[0],
        ],
      })

      // Now create a model instance
      const golfCourseDetails = new GolfCourseDetailsSchema({
        type: "Feature",
        name: json.features[i].properties.name,
        phoneNumber: json.features[i].properties.phoneNumber,
        location: golfCourseLocation,
      })

      nearbyGolfCourse.courses.push(golfCourseDetails)

      i++
    } while (i < json.features.length)

    // Now save in mongoDB
    nearbyGolfCourse
      .save()
      .then(() => console.log("nearbyGolfCourse saved to mongoDB"))
      .catch((err) =>
        res.status(400).json("Error saving nearbyGolfCourse to mongoDB " + err)
      )
  } catch (error) {
    // handle error
    console.log("Error in saveNearbyGolfCourseDataToDatabase ", error)
  }
}
