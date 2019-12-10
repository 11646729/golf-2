const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const createError = require("http-errors")
const favicon = require("serve-favicon")
const cors = require("cors")
const mongoose = require("mongoose")

require("dotenv").config()

// This is a test line

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  reconnectInterval: 500, // Reconnect every 500ms
  poolSize: 10, // Maintain up to 10 socket connections
  // If not connected, return errors immediately rather than waiting for reconnect
  bufferMaxEntries: 0,
  connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
}

try {
  // mongoose.connect(mongodb, options)
  mongoose.connect(process.env.DB, options)
  mongoose.connection.on(
    "connected",
    console.error.bind(console, "Mongodb connected")
  )
} catch (error) {
  console.log("Mongodb connection error")
}

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise

// Initiate our server
const app = express()

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");

// Favicon setup
app.use(favicon(path.join(__dirname, "public/images", "Golf_Pin.ico")))

// Static file location
app.use(express.static(path.join(__dirname, "public")))

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// cors settings from https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/
app.use(
  cors({
    origin: ["http://localhost:" + process.env.PORT],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

// use controllers as per Express Tutorial
// const indexRouter = require("./routes/indexRoute")
const usersRouter = require("./routes/usersRoute")
const golfRouter = require("./routes/golfRoute")
const cruiseRouter = require("./routes/cruiseCatalogRoute")

// routes
//app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/golf", golfRouter)
app.use("/cruise", cruiseRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error("Not Found")
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render("error", {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render("error", {
    message: err.message,
    error: {}
  })
})

module.exports = app
