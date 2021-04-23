import express from "express"
import http from "http"
import path from "path"
import socketIo from "socket.io"
import cors from "cors"
import mongoose from "mongoose"
import toJson from "@meanie/mongoose-to-json"
import dotenv from "dotenv"
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
    origin: ["http://localhost:" + process.env.REACT_SERVER_PORT],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

app.use(express.json())

app.use(express.static(path.join(__dirname, "public")))

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

addMongoose()

runSwitchboard(io)

// Routers use Controllers as per Express Tutorial
const golfRouter = require("./routes/golfRoutes/v2/golfRouteCatalog")
const weatherRouter = require("./routes/weatherRoutes/v1/weatherRouteCatalog")
const cruiseRouter = require("./routes/cruiseRoutes/v1/cruiseRouteCatalog")
const transportRouter = require("./routes/transportRoutes/v1/transportRouteCatalog")

// Routes
app.use("/api/golf", golfRouter)
app.use("/api/weather", weatherRouter)
app.use("/api/cruise", cruiseRouter)
app.use("/api/transport", transportRouter)

// Start Express server
server.listen(port, (err) => {
  if (err) {
    throw err
  } else {
    console.log("Server running on port: " + port)
  }
})

async function addMongoose() {
  try {
    // MongoDB connection string
    const uri = process.env.ATLAS_URI

    // Mongoose connection optional arguments
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
      family: 4, // Use IPv4, skip trying IPv6
    }

    // Add plug-in to change _id to id
    mongoose.plugin(toJson)

    mongoose.connect(uri, options)

    const connection = mongoose.connection
    connection.once("open", () => {
      console.log("Connected to the MongoDB database")
    })
  } catch (error) {
    console.error(error)
  }
}
