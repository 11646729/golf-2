import cron from "node-cron"
import { directDeleteAll as deleteAllPortArrivals } from "./controllers/cruiseControllers/v1/portArrivalsController"
import { directDeleteAll as deleteAllVesselDetails } from "./controllers/cruiseControllers/v1/vesselDetailsController"
import { directDeleteAll as deleteAllTemperatures } from "./controllers/weatherControllers/v1/weatherController"
import { runCron } from "./cronRoutines"
import {
  getAndSaveDarkSkiesData,
  emitDarkSkiesData,
} from "./getDarkSkiesDataAndEmit"
import { saveNearbyGolfCourseDataToDatabase } from "./controllers/golfControllers/v2/golfController"
import { convertGtfsToGeoJSON } from "./convertGtfsToGeoJSON"
import { deleteAllRoutes as deleteGtfsRoutes } from "./controllers/transportControllers/v1/gtfsController"
import { deleteAllStops as deleteGtfsStops } from "./controllers/transportControllers/v1/gtfsController"
import { deleteGtfsPanelListRoutes } from "./deleteGtfsPanelListRoutes"
import { createGtfsRoutesAndGtfsStops } from "./createGtfsRoutesAndGtfsStops"
import { createPanelListRoutes } from "./createPanelListRoutes"
import { deleteAllStops as deleteTranslinkStops } from "./controllers/transportControllers/v1/translinkController"
import { deleteAllShapes as deleteTranslinkShapes } from "./controllers/transportControllers/v1/translinkController"
import { createTranslinkStops } from "./createTranslinkStops"
import { importTranslinkRawShapes } from "./importTranslinkRawShapes"

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
  // -----------------------------
  // console.log("Started getting Vessel Arrivals & Details Scraping")
  // deleteAllPortArrivals()
  // deleteAllVesselDetails()
  // console.log("Vessel Arrivals & Details Scraping done at " + Date.now())
  // -----------------------------
  // deleteAllTemperatures()
  // -----------------------------
  // runCron()
  // -----------------------------
  // convertGtfsToGeoJSON()
  // deleteGtfsRoutes()
  // deleteGtfsStops()
  // deleteGtfsPanelListRoutes()
  // createGtfsRoutesAndGtfsStops()
  // createPanelListRoutes()
  // -----------------------------
  // deleteTranslinkStops()
  // deleteTranslinkShapes()
  // createTranslinkStops()
  // importTranslinkRawShapes()
  // })
  // -----------------------------
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
