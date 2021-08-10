import { fetchGolfCourses } from "./controllers/golfController.js"
import {
  createEmptyTemperatureTable,
  deleteAllTemperatureReadings,
} from "./controllers/weatherController.js"
import { fetchPortArrivalsAndVessels } from "./cruiseScrapingRoutines.js"
import { importGtfsToSQLite } from "./importGtfs.js"
import { createGtfsRoutes } from "./createGtfsRoutes.js"
import { createGtfsStops } from "./createGtfsStops.js"
import cron from "node-cron"
import {
  getAndSaveDarkSkiesData,
  emitDarkSkiesData,
} from "./getDarkSkiesDataAndEmit.js"

export const runSwitchboard = (io) => {
  // -----------------------------
  // fetchGolfCourses()
  // -----------------------------
  // createEmptyTemperatureTable()
  // deleteAllTemperatureReadings()
  // -----------------------------
  // fetchPortArrivalsAndVessels()
  // -----------------------------
  // importGtfsToSQLite()
  // -----------------------------
  // createGtfsRoutes()
  // createGtfsStops()
  // -----------------------------

  // Using socket.io for realtime data transmission
  io.on("connection", (socket) => {
    console.log("Client Connected")

    // Join a room
    const { roomId } = socket.handshake.query
    socket.join(roomId)
    console.log("Joined Room")

    // -----------------------------
    // Fetch data every Day at 07:00
    // cron.schedule("0 7 * * *", () => {

    // Fetch data every 15 Minutes
    // cron.schedule("*/15 * * * *", () => {

    // Fetch data every Minute
    cron.schedule("*/1 * * * *", () => {
      // -----------------------------
      getAndSaveDarkSkiesData().then((result) => {
        console.log("Send temperature: " + result)
        emitDarkSkiesData(socket, result)
      })
    })

    socket.on("disconnect", () => {
      // Leave the room
      socket.leave(roomId)
      console.log("Left Room & Client Disconnected")
    })
  })
}
