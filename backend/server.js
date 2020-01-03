import { getSingleArrivalsSchedule } from "./scrapeArrivals"
import { getSingleVesselDetails } from "./scrapeVessels"

import express from "express"
import cors from "cors"
import mongoose from "mongoose"
// const path = require("path")
// const cookieParser = require("cookie-parser")
// const logger = require("morgan")
// const createError = require("http-errors")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

// cors settings from https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/
app.use(
  cors({
    origin: ["http://localhost:" + process.env.PORT],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

app.use(cors())

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
  // DO STUFF
  connection.close()
  console.log("MongoDB database connection closed successfully")
})

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise

// use controllers as per Express Tutorial
// const indexRouter = require("./routes/cruiseRoutes/v1/indexRoute")
const usersRouter = require("./routes/cruiseRoutes/v1/usersRoute")
const golfRouter = require("./routes/golfRoutes/v1/golfRoute")
const cruiseRouter = require("./routes/cruiseRoutes/v1/cruiseCatalogRoute")

// routes
//app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/golf", golfRouter)
app.use("/cruise", cruiseRouter)

app.listen(port, () => {
  console.log("Server is running on port:" + port)
})

async function go(Month, Year) {
  const vesselArrivals = await getSingleArrivalsSchedule(Month, Year)

  console.log(vesselArrivals)

  // Now fetch the vessel details for the arrivals
  // TODO - Check if vessel already exists & hasn't been updated first
  // -----------------------------------------------------------------
  let vessel_url
  let vesselDetails

  for (let i = 0; i < vesselArrivals.length; i++) {
    vessel_url = vesselArrivals[i].vessel_name_url

    vesselDetails = await getSingleVesselDetails(vessel_url)

    //    console.log(vesselDetails)
  }
}

go(4, 2020)
