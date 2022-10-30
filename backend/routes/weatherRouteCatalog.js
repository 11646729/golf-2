import express from "express"
import {
  index,
  prepareEmptyTemperaturesTable,
  getTemperaturesFromDatabase,
  getOpenWeatherFromDatabase,
} from "../controllers/weatherController.js"

var weatherRouter = express.Router()

// ---------------------------------------------------
// Weather Routes
// ---------------------------------------------------
// GET catalogue home page
weatherRouter.get("/", index)

// Prepare the temperatures table in the database
weatherRouter.post("/prepareTemperaturesTable", prepareEmptyTemperaturesTable)

// GET all temperature readings from the database
weatherRouter.get("/getTemperatures", getTemperaturesFromDatabase)

// GET all temperature readings from the database
weatherRouter.get("/getOpenWeather", getOpenWeatherFromDatabase)

export default weatherRouter
