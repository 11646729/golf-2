"use strict"

import cron from "node-cron"
import { emptyFile, runCron } from "./cronRoutines"
import {
  getDarkSkiesData,
  emitDarkSkiesData,
  clearDarkSkiesData,
  saveDarkSkiesDataToDatabase,
} from "./getDarkSkiesDataAndEmit"
import {
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
      console.log("Started getting Vessel Arrivals & Details Scraping!")
      emptyFile()
      runCron()
      console.log("Vessel Arrivals & Details Scraping done at " + Date.now())
    })

    cron.schedule("* * * * *", () => {
      console.log("Started getting Dark Skies Weather data!")

      getDarkSkiesData().then((result) => {
        // console.log(
        //   "In switchboard function (getDarkSkiesData): " +
        //     result.data.currently.temperature
        // )

        emitDarkSkiesData(socket, result).then((result) => {
          // console.log(
          //   "In switchboard function (emitDarkSkiesData): " +
          //     result.data.currently.temperature
          // )
        })

        // if (count > 3) {
        // clearDarkSkiesData(socket).then((result) => {
        //   // console.log(
        //   //   "In switchboard function (emitDarkSkiesData): " +
        //   //     result.data.currently.temperature
        //   // )
        // })

        //   count = 0
        // } else {
        //   count++

        //   console.log("In counter loop " + count)
        // }

        saveDarkSkiesDataToDatabase(result).then((result) => {
          // console.log(
          //   "In switchboard function (saveDarkSkiesDataToDatabase): " +
          //     result.data.currently.temperature
          // )
        })

        emitNearbyGolfCourseData(socket, result).then((result) => {
          // console.log(
          //   "In switchboard function (emitNearbyGolfCourseData)"
          // )
        })

        saveNearbyGolfCourseDataToDatabase().then((result) => {
          // console.log(
          //   "In switchboard function (saveGolfCourseDataToDatabase)"
          // )
        })
      })
    })

    socket.on("disconnect", () => {
      console.log("Client Disconnected")
    })
  })
}
