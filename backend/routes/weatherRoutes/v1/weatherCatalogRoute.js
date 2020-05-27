import express from "express"
var router = express.Router()

// Require weather controller module
const weather_controller = require("../../../controllers/weatherControllers/v1/weatherController")

/// Dark Skies Weather Routes ///
// GET catalogue home page
router.get("/", weather_controller.weatherIndex)

// GET weather readings from the database - from Home at present
router.get("/homeWeather", weather_controller.findAll)

// POST a single weather reading to the database
router.post("/homeWeather/:id", weather_controller.create)

module.exports = router
