import express from "express"
var weatherRouter = express.Router()
import {
  index,
  prepareEmptyTemperaturesTable,
  getTemperatures,
} from "../controllers/weatherController.js"

// -------------------------------------------------------
// GET catalogue home page
// -------------------------------------------------------
weatherRouter.get("/", index)

// -------------------------------------------------------
// Prepare the temperatures table in the SQL database
// -------------------------------------------------------
weatherRouter.post("/prepareTemperaturesTable", prepareEmptyTemperaturesTable)

// -------------------------------------------------------
// GET all temperature readings from the database
// -------------------------------------------------------
weatherRouter.get("/getTemperatures", getTemperatures)

export default weatherRouter
