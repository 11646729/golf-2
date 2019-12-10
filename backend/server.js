const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const createError = require("http-errors")
const favicon = require("serve-favicon")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

mongoose.connect(uri, options)

const connection = mongoose.connection

connection.once("open", () => {
  console.log("MongoDB database connection established successfully")
})

// try {
//   mongoose.connect(mongodb, options)
//   mongoose.connect(process.env.ATLAS_URI, options)
//   mongoose.connection.on(
//     "connected",
//     console.error.bind(console, "Mongodb connected")
//   )
// } catch (error) {
//   console.log("Mongodb connection error")
// }

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise

app.listen(port, () => {
  console.log("Server is running on port:" + port)
})
