"use strict"

import express from "express"
import http from "http"
import path from "path"
import socketIo from "socket.io"
import cors from "cors"
import mongoose from "mongoose"
import dotenv from "dotenv"

// This line is required to run cron
import { emptyFile, runCron, getAndSavePortArrivals } from "../backend/cron"

import { runSwitchboard } from "./switchBoard"

// const cookieParser = require("cookie-parser")
// const logger = require("morgan")
// const createError = require("http-errors")

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

const port = process.env.PORT || 5000

// cors settings from https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/
app.use(
  cors({
    origin: ["http://localhost:" + process.env.PORT],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)
app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))

// MongoDB connection string
const uri = process.env.ATLAS_URI

// Mongoose connection optional arguements
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 30, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 360000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

mongoose.connect(uri, options)

const connection = mongoose.connection
connection.once("open", () => {
  console.log("MongoDB database connection established successfully")
})

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise

// use controllers as per Express Tutorial
// const indexRouter = require("./routes/cruiseRoutes/v1/indexRoute")
// const usersRouter = require("./routes/cruiseRoutes/v1/usersRoute")
// const golfRouter = require("./routes/golfRoutes/v1/golfRoute")
const cruiseShipsRouter = require("./routes/cruiseRoutes/v1/cruiseShipsCatalogRoute")

// routes
// app.use("/", indexRouter)
// app.use("/users", usersRouter)
// app.use("/golf", golfRouter)
app.use("/cruiseShips", cruiseShipsRouter)

runSwitchboard(io)

server.listen(port, err => {
  if (err) {
    throw err
  }
})

console.log("Server is running on port: " + port)
