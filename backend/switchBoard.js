"use strict"

import cron from "node-cron"
import { runCron } from "./cronRoutines"
import { directDeleteAll as deleteAllPortArrivals } from "./controllers/cruiseControllers/v1/portArrivalsController"
import { directDeleteAll as deleteAllVesselDetails } from "./controllers/cruiseControllers/v1/vesselDetailsController"
import { directDeleteAll as deleteAllBusStops } from "./controllers/transportControllers/v1/transportController"
import { directDeleteAll as deleteAllTemperatures } from "./controllers/weatherControllers/v1/weatherController"
import { directDeleteAll as deleteAllRouteShapes } from "./controllers/transportControllers/v1/transportController"
import {
  getAndSaveDarkSkiesData,
  emitDarkSkiesData,
} from "./getDarkSkiesDataAndEmit"
import { saveNearbyGolfCourseDataToDatabase } from "./controllers/golfControllers/v2/golfController"
import {
  saveTranslinkStopsDataToDatabase,
  saveTranslinkRouteDataToDatabase,
  saveTranslinkRouteDataToDatabase1,
  saveTranslinkRouteDataToDatabase2,
  saveTranslinkRouteDataToDatabase3,
  saveTranslinkRouteDataToDatabase4,
  saveTranslinkRouteDataToDatabase5,
} from "./middleTier/transportDataML"
import { importGtfsData } from "./importGtfsData"
import { convertGtfsDataToGeojson } from "./convertGtfsDataToGeojson"
import { createReducedShapeData } from "./createReducedShapeData"

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
    // cron.schedule("0 7 * * *", () => {
    // cron.schedule("*/15 * * * *", () => {
    // console.log("Started getting Vessel Arrivals & Details Scraping")
    // deleteAllPortArrivals()
    // deleteAllVesselDetails()
    // deleteAllTemperatures()
    // runCron()
    // importGtfsData()
    // createReducedShapeData()
    // console.log("Back in the switchBoard function")
    // convertGtfsDataToGeojson()
    // saveTranslinkStopsDataToDatabase()
    // saveTranslinkRouteDataToDatabase()
    // saveTranslinkRouteDataToDatabase1()
    // saveTranslinkRouteDataToDatabase2()
    // saveTranslinkRouteDataToDatabase3()
    // saveTranslinkRouteDataToDatabase4()
    // saveTranslinkRouteDataToDatabase5()
    // console.log("Vessel Arrivals & Details Scraping done at " + Date.now())
    // })

    // Fetch data every 5 minutes
    // cron.schedule("1 * * * *", () => {
    //   getAndSaveDarkSkiesData().then((result) => {
    //     emitDarkSkiesData(socket, result).then(() => {
    //       console.log("Fetched temperature value")
    //     })
    //   })
    // })

    // Save data to database every 10 minutes
    // cron.schedule("*/10 * * * *", () => {
    // deleteAllBusStops()
    // saveTranslinkStopsDataToDatabase().then(() => {
    //   console.log("In switchboard function saveTranslinkStopsDataToDatabase")
    // })
    // saveNearbyGolfCourseDataToDatabase().then(() => {
    //   console.log("In switchboard function saveGolfCourseDataToDatabase")
    // })
    // })

    socket.on("disconnect", () => {
      console.log("Client Disconnected")
    })
  })
}
