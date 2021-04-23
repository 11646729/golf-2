import cron from "node-cron"
import { directDeleteAll as deleteAllTemperatures } from "./controllers/weatherControllers/v1/weatherController"
import {
  getAndSaveDarkSkiesData,
  emitDarkSkiesData,
} from "./getDarkSkiesDataAndEmit"
import { fetchPortArrivalsAndVessels } from "./cruiseScrapingRoutines"
import { importGtfsToSQLite } from "./importGtfsToSQLite"
import { deleteAllRoutes } from "./deleteAllRoutes"
import { createGtfsRoutes } from "./createGtfsRoutes"
import { createShapes } from "./createShapes"
import { deleteAllStops } from "./deleteAllStops"
import { createStops } from "./createStops"
import { createGtfsStops } from "./createGtfsStops"
import { createFilledGolfCourseTable } from "./createFilledGolfCourseTable"

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
  // fetchPortArrivalsAndVessels()
  // -----------------------------
  // deleteAllTemperatures()
  // -----------------------------
  // createFilledGolfCourseTable()
  // -----------------------------
  // importGtfsToSQLite()
  // -----------------------------
  // deleteAllRoutes()
  // deleteAllStops()
  // createGtfsRoutes()
  // createGtfsStops()
  // -----------------------------
  // createShapes()
  // createStops()
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
