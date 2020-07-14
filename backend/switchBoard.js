"use strict"

import cron from "node-cron"
import { runCron } from "./cronRoutines"
import { directDeleteAll as deleteAllPortArrivals } from "./controllers/cruiseControllers/v1/portArrivalsController"
import { directDeleteAll as deleteAllVesselDetails } from "./controllers/cruiseControllers/v1/vesselDetailsController"
import {
  getAndSaveDarkSkiesData,
  emitDarkSkiesData,
} from "./getDarkSkiesDataAndEmit"
import {
  getNearbyGolfCourseDataFromDatabase,
  saveNearbyGolfCourseDataToDatabase,
} from "./middleTier/nearbyGolfCoursesML"
import { saveTransportDataToDatabase } from "./middleTier/transportDataML"

let count = 0

export const runSwitchboard = (io) => {
  // Using socket.io for realtime
  io.on("connection", (socket) => {
    console.log("Client Connected")

    // Start listening for browser position data
    socket.on("fetchLocation", (pos) => {
      console.log("In the fetchLocation function in the switchboard file")
    })

    // Fetch data Daily at 07:00
    cron.schedule("0 7 * * *", () => {
      // console.log("Started getting Vessel Arrivals & Details Scraping")
      deleteAllPortArrivals()
      deleteAllVesselDetails()
      runCron()
      // console.log("Vessel Arrivals & Details Scraping done at " + Date.now())
    })

    // Fetch data Daily at 07:00
    cron.schedule("0 7 * * *", () => {
      getAndSaveDarkSkiesData().then((result) => {
        emitDarkSkiesData(socket, result).then(() => {})
      })
    })

    cron.schedule("* * * * *", () => {
      saveTransportDataToDatabase().then(() => {
        console.log("In switchboard function saveTransportDataToDatabase")
      })

      // saveNearbyGolfCourseDataToDatabase().then(() => {
      //   console.log("In switchboard function saveGolfCourseDataToDatabase")
      // })
    })

    socket.on("disconnect", () => {
      console.log("Client Disconnected")
    })
  })
}
