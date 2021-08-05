import express from "express"
var weatherRouter = express.Router()
import {
  index,
  getAllTemperatureReadings,
  deleteAllTemperatureReadings,
} from "../controllers/weatherController.js"

// -------------------------------------------------------
// GET catalogue home page
// -------------------------------------------------------
weatherRouter.get("/", index)

// -------------------------------------------------------
// GET all temperature readings from the database
// -------------------------------------------------------
weatherRouter.get("/temperatureReadings", getAllTemperatureReadings)

// -------------------------------------------------------
// DELETE all temperature readings from the database
// -------------------------------------------------------
weatherRouter.delete("/temperatureReadings", deleteAllTemperatureReadings)

export default weatherRouter
