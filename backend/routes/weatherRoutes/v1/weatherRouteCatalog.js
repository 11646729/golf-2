import express from "express"
var router = express.Router()

// Require weather controller module
const weatherController = require("../../../controllers/weatherControllers/v1/weatherController")

/// Weather Routes ///
// GET catalogue home page
router.get("/", weatherController.index)

// GET all temperature readings from the database
router.get("/temperatureReadings", weatherController.getAllTemperatureReadings)

// DELETE all temperature readings from the database
router.delete(
  "/temperatureReadings",
  weatherController.deleteAllTemperatureReadings
)

module.exports = router
