"use strict"

import axios from "axios"
import { NearbyGolfCourseSchema } from "./models/golfModels/v1/nearbyGolfCourseSchema"
import { GolfCourseDetailsSchema } from "./models/golfModels/v1/golfCourseDetailsSchema"
import { LocationSchema } from "./models/commonModels/locationSchema"

export const clearNearbyGolfCourseDataFromDatabase = async () => {
  try {
    NearbyGolfCourseSchema.deleteMany({}, function (error) {
      if (error) {
        console.log("Error in NearbyGolfCourse.deleteMany() : ", error)
      } else {
        console.log("NearbyGolfCourse collection emptied")
      }
    })
  } catch (error) {
    // handle error
    console.log("Error in clearNearbyGolfCourseDataFromDatabase: ", error)
  }
}

// Function to fetch nearby golf course data from the database
export const getNearbyGolfCourseDataFromDatabase = async () => {
  try {
    NearbyGolfCourseSchema.find({}).then((result) => {
      console.log("Data from mongoDB is : " + result)
    })
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
      // courses: nearbyGolfCourseData.courses,
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
    const json = require("./nearbyGolfCourses.json")

    const golfCourseDetailArray = []
    let i = 0
    do {
      // NB Coordinates in GeoJSON order - Longitude then Latitude
      const golfCourseLocation = new LocationSchema({
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

      golfCourseDetailArray.push(golfCourseDetails)

      i++
    } while (i < json.features.length)

    const nearbyGolfCourse = new NearbyGolfCourseSchema({
      databaseVersion: process.env.DATABASE_VERSION,
      type: "FeatureCollection",
      crsName: "WGS84",
      crsUrn: "urn:ogc:def:crs:OGC:1.3:CRS84",
      courses: golfCourseDetailArray,
    })

    // Now save in mongoDB
    nearbyGolfCourse
      .save()
      .then(() => console.log("nearbyGolfCourseData saved to mongoDB"))
      .catch((err) =>
        console.log("Error saving nearbyGolfCourse to mongoDB " + err)
      )
  } catch (error) {
    // handle error
    console.log("Error in saveNearbyGolfCourseDataToDatabase ", error)
  }
}
