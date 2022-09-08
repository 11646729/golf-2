import express from "express"
import {
  index,
  prepareEmptyTemperaturesTable,
  getTemperatures,
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
weatherRouter.get("/getTemperatures", getTemperatures)

export default weatherRouter
