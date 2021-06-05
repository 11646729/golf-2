import { fetchGolfCourses } from "./controllers/golfController"
import {
  createEmptyTemperatureTable,
  deleteAllTemperatureReadings,
} from "./controllers/weatherController"
import { fetchPortArrivalsAndVessels } from "./cruiseScrapingRoutines"
import { importGtfsToSQLite } from "./importGtfsToSQLite"
import { deleteAllRoutes } from "./deleteAllRoutes"
import { deleteAllStops } from "./deleteAllStops"
import { createGtfsRoutes } from "./createGtfsRoutes"
import { createGtfsStops } from "./createGtfsStops"
import { createShapes } from "./createShapes"
import { createStops } from "./createStops"
import cron from "node-cron"
import {
  getAndSaveDarkSkiesData,
  emitDarkSkiesData,
} from "./getDarkSkiesDataAndEmit"

export const runSwitchboard = (io) => {
  // -----------------------------
  fetchGolfCourses()
  // -----------------------------
  // createEmptyTemperatureTable()
  // deleteAllTemperatureReadings()
  // -----------------------------
  // fetchPortArrivalsAndVessels()
  // -----------------------------
  // importGtfsToSQLite()
  // deleteAllRoutes()
  // deleteAllStops()
  // -----------------------------
  // createGtfsRoutes()
  // createGtfsStops()
  // createShapes()
  // createStops()
  // -----------------------------
  // Using socket.io for realtime
  // io.on("connection", (socket) => {
  // console.log("Client Connected")
  // Start listening for browser position data
  // socket.on("fetchLocation", (pos) => {
  //   console.log(
  //     "Start listening to the fetchLocation event in the switchboard file"
  //   )
  // })
  // -----------------------------
  // Fetch data Daily at 07:00
  // cron.schedule("0 7 * * *", () => {
  // Fetch data every 15 Minutes
  // cron.schedule("*/15 * * * *", () => {
  // Fetch data every Minute
  // cron.schedule("*/1 * * * *", () => {
  //   // -----------------------------
  // getAndSaveDarkSkiesData().then((result) => {
  //     emitDarkSkiesData(socket, result)
  // .then(() => {})
  // })
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
