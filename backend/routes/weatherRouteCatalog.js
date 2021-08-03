import express from "express"
var weatherRouter = express.Router()
import weatherController from "../controllers/weatherController.js"

// -------------------------------------------------------
// GET catalogue home page
// -------------------------------------------------------
// weatherRouter.get("/", weatherController.index)

weatherRouter.get("/", function (req, res) {
  res.send("WeatherController home page")
})

// -------------------------------------------------------
// GET all temperature readings from the database
// -------------------------------------------------------
// weatherRouter.get(
//   "/temperatureReadings",
//   weatherController.getAllTemperatureReadings
// )

weatherRouter.get("/temperatureReadings", function (req, res) {
  res.send("get temperatureReadings page")
})

// -------------------------------------------------------
// DELETE all temperature readings from the database
// -------------------------------------------------------
// weatherRouter.delete(
//   "/temperatureReadings",
//   weatherController.deleteAllTemperatureReadings
// )

weatherRouter.delete("/temperatureReadings", function (req, res) {
  res.send("delete temperatureReadings page")
})

export default weatherRouter
