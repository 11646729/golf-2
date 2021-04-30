import express from "express"
var router = express.Router()

// Require weather controller module
const weather_controller = require("../../../controllers/weatherControllers/v1/weatherController")

/// Weather Routes ///
// GET catalogue home page
router.get("/", weather_controller.index)

// GET all temperature readings from the database
router.get("/temperatureReadings", weather_controller.getAllTemperatureReadings)

module.exports = router
