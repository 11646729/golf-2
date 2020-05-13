"use strict"

import cron from "node-cron"
import { runCron } from "./cronRoutines"
import { clearDatabaseCollections } from "./clearDatabaseCollections"
import {
  getDarkSkiesData,
  emitDarkSkiesData,
  saveDarkSkiesDataToDatabase,
} from "./getDarkSkiesDataAndEmit"
import {
  clearNearbyGolfCourseDataFromDatabase,
  getNearbyGolfCourseDataFromDatabase,
  emitNearbyGolfCourseData,
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
      console.log("Started getting Vessel Arrivals & Details Scraping")
      clearDatabaseCollections()
      runCron()
      console.log("Vessel Arrivals & Details Scraping done at " + Date.now())
    })

    cron.schedule("* * * * *", () => {
      console.log("Started getting Dark Skies Weather data")

      getDarkSkiesData().then((result) => {
        console.log(
          "DarkSkiesData obtained: " + result.data.currently.temperature
        )
        // console.log("In switchboard function getDarkSkiesData")

        emitDarkSkiesData(socket, result).then(() => {
          console.log("Now emitting DarkSkiesData over socket.io")
        })

        //     // if (count > 3) {
        //     // clearDarkSkiesData(socket).then((result) => {
        //     //   // console.log(
        //     //   //   "In switchboard function (emitDarkSkiesData): " +
        //     //   //     result.data.currently.temperature
        //     //   // )
        //     // })

        //     //   count = 0
        //     // } else {
        //     //   count++

        //     //   console.log("In counter loop " + count)
        //     // }

        saveDarkSkiesDataToDatabase(result).then(() => {
          // console.log(
          //   "In switchboard function (saveDarkSkiesDataToDatabase): " +
          //     result.data.currently.temperature
          // )
        })
      })
    })

    cron.schedule("* * * * *", () => {
      console.log("Started getting Nearby Golf Course data")

      // clearNearbyGolfCourseDataFromDatabase().then(() => {
      //   console.log("In switchboard function clearGolfCourseDataFromDatabase")
      // })

      // saveNearbyGolfCourseDataToDatabase().then(() => {
      //   console.log("In switchboard function saveGolfCourseDataToDatabase")
      // })

      getNearbyGolfCourseDataFromDatabase().then((result) => {
        console.log("In switchboard function getNearbyGolfCourseData")

        emitNearbyGolfCourseData(socket, result).then(() => {
          console.log("Now emitting NearbyGolfCourseData over socket.io")
        })
      })
    })

    socket.on("disconnect", () => {
      console.log("Client Disconnected")
    })
  })
}
