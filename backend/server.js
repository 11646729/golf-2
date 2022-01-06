import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { createServer } from "http"
import { Server } from "socket.io"
import cron from "node-cron"
import path from "path"
import { importGtfsToSQLite } from "./importGtfs.js"
import {
  getAndSaveDarkSkiesData,
  emitDarkSkiesData,
} from "./controllers/weatherController.js"

var switchOnRealtimeTemperatureData = (switchOn) => {
  if (switchOn) {
    // Using socket.io for realtime data transmission
    var roomno = 1
    io.on("connection", (socket) => {
      console.log("Client Connected")

      // Join a room
      socket.join("room-" + roomno)
      console.log("Joined Room No: " + roomno)

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
        socket.leave("room-" + roomno)
        console.log("Left Room & Client Disconnected")
      })
    })
  }
}

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, { cors: { origin: "*" } })

const __dirname = path.resolve()

// const cookieParser = require("cookie-parser")
// const logger = require("morgan")
// const createError = require("http-errors")

// Routers use Controllers as per Express Tutorial
import golfRouter from "./routes/golfRouteCatalog.js"
import weatherRouter from "./routes/weatherRouteCatalog.js"
import cruiseRouter from "./routes/cruiseRouteCatalog.js"
import transportRouter from "./routes/transportRouteCatalog.js"

dotenv.config()

const port = process.env.PORT || 5000

// cors settings from https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/
app.use(
  cors({
    origin: ["http://localhost:" + process.env.REACT_SERVER_PORT],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/api/golf", golfRouter)
app.use("/api/weather", weatherRouter)
app.use("/api/cruise", cruiseRouter)
app.use("/api/transport", transportRouter)

// -----------------------------
importGtfsToSQLite()
// -----------------------------

switchOnRealtimeTemperatureData(false)

// Start Express server
httpServer.listen(port, (err) => {
  if (err) {
    throw err
  } else {
    console.log("Server running on port: " + port)
  }
})
