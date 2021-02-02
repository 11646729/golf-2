import cron from "node-cron"
import { directDeleteAll as deleteAllPortArrivals } from "./controllers/cruiseControllers/v1/portArrivalsController"
import { directDeleteAll as deleteAllVesselDetails } from "./controllers/cruiseControllers/v1/vesselDetailsController"
import { directDeleteAll as deleteAllTemperatures } from "./controllers/weatherControllers/v1/weatherController"
import { runCron } from "./cronRoutines"
import { createReducedShapeData } from "./createReducedShapeData"
import { importTripIdReducedShapeData } from "./importTripIdIntoReducedShapeData"
import { importTranslinkStopData } from "./importTranslinkStopData"
import { importTranslinkShapeData } from "./importTranslinkShapeData"
import { importAndReduceTranslinkShapeData } from "./importAndReduceTranslinkShapeData"
import {
  getAndSaveDarkSkiesData,
  emitDarkSkiesData,
} from "./getDarkSkiesDataAndEmit"
import { directDeleteAll as deleteAllBusStops } from "./controllers/transportControllers/v1/translinkController"
import { saveNearbyGolfCourseDataToDatabase } from "./controllers/golfControllers/v2/golfController"
import { convertGtfsToGeoJSON } from "./convertGtfsToGeoJSON"
import { deleteOldReducedRoutes } from "./deleteOldReducedRoutes"
import { deleteOldReducedStops } from "./deleteOldReducedStops"
import { deleteOldUniqueReducedRoutes } from "./deleteOldUniqueReducedRoutes"
import { createReducedRoutesAndStops } from "./createReducedRoutesAndStops"
import { createUniqueReducedRoutes } from "./createUniqueReducedRoutes"

// import { directDeleteAll as deleteAllRouteShapes } from "./controllers/transportControllers/v1/translinkController"

export const runSwitchboard = (io) => {
  // Using socket.io for realtime
  // io.on("connection", (socket) => {
  //   console.log("Client Connected")
  // Start listening for browser position data
  // socket.on("fetchLocation", (pos) => {
  //   console.log(
  //     "Start listening to the fetchLocation event in the switchboard file"
  //   )
  // })
  // Fetch data Daily at 07:00
  // cron.schedule("0 7 * * *", () => {
  // cron.schedule("*/15 * * * *", () => {
  // console.log("Started getting Vessel Arrivals & Details Scraping")
  // deleteAllPortArrivals()
  // deleteAllVesselDetails()
  // console.log("Vessel Arrivals & Details Scraping done at " + Date.now())
  // deleteAllTemperatures()
  // runCron()
  // -----------------------------
  // convertGtfsToGeoJSON()
  // deleteOldReducedRoutes()
  // deleteOldReducedStops()
  // deleteOldUniqueReducedRoutes()
  // createReducedRoutesAndStops()
  // createUniqueReducedRoutes()
  // -----------------------------
  // createReducedShapeData()
  // importTripIdReducedShapeData()
  // console.log("Back in the switchBoard function")
  // importTranslinkStopData()
  // importTranslinkShapeData()
  // importAndReduceTranslinkShapeData()
  // })
  // Fetch data every 1 minutes
  // cron.schedule("*/1 * * * *", () => {
  //   getAndSaveDarkSkiesData().then((result) => {
  //     emitDarkSkiesData(socket, result).then(() => {
  //       console.log("Fetched temperature value")
  //     })
  //   })
  // })
  // Save data to database every 10 minutes
  // cron.schedule("*/10 * * * *", () => {
  //   deleteAllBusStops()
  //   saveNearbyGolfCourseDataToDatabase().then(() => {
  //     console.log("In switchboard function saveGolfCourseDataToDatabase")
  //   })
  // })
  // socket.off("fetchLocation", () => {
  //   console.log(
  //     "Stop listening to the fetchLocation event in the switchboard file"
  //   )
  // })
  // socket.on("disconnect", () => {
  //   console.log("Client Disconnected")
  // })
  // })
}
