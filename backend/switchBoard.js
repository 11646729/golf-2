"use strict"

import cron from "node-cron"
import { emptyFile, runCron } from "./cronRoutines"
import {
  getDarkSkiesData,
  emitDarkSkiesData,
  saveDarkSkiesDataToDatabase,
} from "./getDarkSkiesDataAndEmit"

let darkSkiesData

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
        emitDarkSkiesData(socket, result).then((result) => {
          // saveDarkSkiesDataToDatabase(socket, result)
          //        console.log("In switchboard function : " + result)
        })
      })
    })

    socket.on("disconnect", () => {
      console.log("Client Disconnected")
    })
  })
}
