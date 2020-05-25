"use strict"

import { NearbyGolfCourseSchema } from "./models/golfModels/v2/nearbyGolfCourseSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

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
    const golfCourses = await NearbyGolfCourseSchema.find()

    // console.log("Data from mongoDB is : " + golfCourses)

    return golfCourses
  } catch (error) {
    // handle error
    console.log("Error in getNearbyGolfCourseDataFromDatabase: ", error)
  }
}

// Function to save nearby golf course data to mongodb
// Longitude first in Javascript
export const saveNearbyGolfCourseDataToDatabase = async () => {
  try {
    const json = require("./nearbyGolfCourses.json")

    let i = 0
    do {
      const golfCourseCoords = new CoordsSchema({
        lat: json.features[i].geometry.coordinates[1],
        lng: json.features[i].geometry.coordinates[0],
      })

      // Now create a model instance
      const nearbyGolfCourse = new NearbyGolfCourseSchema({
        databaseVersion: process.env.DATABASE_VERSION,
        type: "Golf Course",
        crsName: "WGS84",
        crsUrn: "urn:ogc:def:crs:OGC:1.3:CRS84",
        name: json.features[i].properties.name,
        phoneNumber: json.features[i].properties.phoneNumber,
        photoTitle: "Istanbul Bridge Photo",
        photoUrl: "static/images/Bosphorus.jpg",
        description:
          "Istanbul is a major city in Turkey that straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects cultural influences of the many empires that once ruled here.",
        coordinates: golfCourseCoords,
      })

      // Now save in mongoDB
      nearbyGolfCourse
        .save()
        // .then(() => console.log(i + " nearbyGolfCourses saved to mongoDB"))
        .catch((err) =>
          console.log("Error saving nearbyGolfCourse to mongoDB " + err)
        )

      i++
    } while (i < json.features.length)
  } catch (error) {
    // handle error
    console.log("Error in saveNearbyGolfCourseDataToDatabase ", error)
  }
}
