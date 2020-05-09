"use strict"

import axios from "axios"
import { NearbyGolfCourseSchema } from "./models/golfModels/v1/nearbyGolfCourse"
import { GolfCourseDetailsSchema } from "./models/golfModels/v1/golfCourseDetails"
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
export const saveNearbyGolfCourseDataToDatabase = async () => {
  try {
    const golfCourseLocation = new GolfCourseLocationSchema({
      type: "Point",
      //      coordinates: [-5.604549, 54.258716],
    })

    //    golfCourseLocation.coordinates.push("-5.604549")
    //    golfCourseLocation.coordinates.push(54.258716)

    const golfCourseDetails = new GolfCourseDetailsSchema({
      type: "Feature",
      name: "Ardglass Golf Club",
      phoneNumber: "028 44 841 219",
      location: { golfCourseLocation },
    })

    const nearbyGolfCourse = new NearbyGolfCourseSchema({
      databaseVersion: process.env.DATABASE_VERSION,
      type: "FeatureCollection",
      crsName: "WGS84",
      crsUrn: "urn:ogc:def:crs:OGC:1.3:CRS84",
    })

    nearbyGolfCourse.courses.push(golfCourseDetails)

    console.log(nearbyGolfCourse)
    nearbyGolfCourse.save(function (err) {
      if (err) console.log("Error saving header to nearbyGolfCourse.")
    })

    // let featuresArray = []
    // let i = 0
    // do {
    //   // let type = json.type
    //   // let header = json.header
    //   // let feature = json.features[i]
    //   let location_name = json.features[i].properties.name
    //   let location_phone_number = json.features[i].properties.phoneNumber
    //   let location_latitude = json.features[i].geometry.coordinates[0]
    //   let location_longitude = json.features[i].geometry.coordinates[1]
    //   // Home Coordinates in GeoJSON
    //   const location_coords = {
    //     type: "Point",
    //     coordinates: [location_latitude, location_longitude],
    //   }
    //   // Now create a model instance
    //   // const nearbyCourses = new NearbyGolfCourses({
    //   //   // database_version,
    //   //   location_name,
    //   //   location_coords,
    //   //   location_phone_number,
    //   // })
    //   // console.log("NearbyGolfCourses: " + nearbyCourses)
    //   // console.log(json)
    //   // console.log(nearbyGolfCourses)
    //   // Now save in mongoDB
    //   nearbyGolfCourses.save()
    //   i++
    // } while (i < json.features.length)
    // console.log("Features array: " + featuresArray)
  } catch (error) {
    // handle error
    console.log("Error in saveNearbyGolfCourseDataToDatabase ", error)
  }
}
