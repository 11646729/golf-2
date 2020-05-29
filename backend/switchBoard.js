"use strict"

import cron from "node-cron"
import { runCron } from "./cronRoutines"
import { directDeleteAll as deleteAllPortArrivals } from "./controllers/cruiseControllers/v1/portArrivalsController"
import { directDeleteAll as deleteAllVesselDetails } from "./controllers/cruiseControllers/v1/vesselDetailsController"
import { directDeleteAll as deleteAllTemperatureReadings } from "./controllers/weatherControllers/v1/weatherController"
import {
  getDarkSkiesData,
  emitDarkSkiesData,
  saveDarkSkiesDataToDatabase,
} from "./getDarkSkiesDataAndEmit"
import {
  clearNearbyGolfCourseDataFromDatabase,
  getNearbyGolfCourseDataFromDatabase,
  saveNearbyGolfCourseDataToDatabase,
} from "./getNearbyGolfCourseData"

let count = 0

export const runSwitchboard = (io) => {
  // Using socket.io for realtime
  io.on("connection", (socket) => {
    console.log("Client Connected")

    // Start listening for browser position data
    socket.on("fetchLocation", (pos) => {
      console.log("In the fetchLocation function in the switchboard file")
    })

    cron.schedule("* * * * *", () => {
      // console.log("Started getting Vessel Arrivals & Details Scraping")
      deleteAllPortArrivals()
      deleteAllVesselDetails()
      // deleteAllTemperatureReadings()
      runCron()
      // console.log("Vessel Arrivals & Details Scraping done at " + Date.now())
    })

    cron.schedule("* * * * *", () => {
      // console.log("Started getting Dark Skies Weather data")

      getDarkSkiesData().then((result) => {
        // console.log(
        //   "DarkSkiesData obtained: " + result.data.currently.temperature
        // )

        emitDarkSkiesData(socket, result).then(() => {
          // console.log(
          //   "Emitting DarkSkiesData over socket.io: " +
          //     result.data.currently.temperature
          // )
        })

        saveDarkSkiesDataToDatabase(result).then(() => {
          // console.log(
          //   "Saving DarkSkiesData to database: " +
          //     result.data.currently.temperature
          // )
        })
      })
    })

    cron.schedule("* * * * *", () => {
      // console.log("Started getting Nearby Golf Course data")
      // clearNearbyGolfCourseDataFromDatabase().then(() => {
      //   console.log("In switchboard function clearGolfCourseDataFromDatabase")
      // })
      // saveNearbyGolfCourseDataToDatabase().then(() => {
      //   console.log("In switchboard function saveGolfCourseDataToDatabase")
      // })
      getNearbyGolfCourseDataFromDatabase().then((result) => {
        // console.log(
        //   "Fetching NearbyGolfCourse data from the Database: " +
        //     result[0].courses
        // )
      })
    })

    socket.on("disconnect", () => {
      console.log("Client Disconnected")
    })
  })
}
