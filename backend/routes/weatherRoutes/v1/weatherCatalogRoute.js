import express from "express"
var router = express.Router()

// Require weather controller module
const dark_skies_weather_controller = require("../../../controllers/weatherControllers/v1/darkSkiesWeatherController")

/// Dark Skies Weather Routes ///
// Get catalogue home page
router.get("/", dark_skies_weather_controller.index_get)

// Get weather readings from the database - from Home at present
router.get("/homeWeather", dark_skies_weather_controller.home_weather_get)

// Post a single weather reading to the database
router.post("/homeWeather/:id", dark_skies_weather_controller.home_weather_add)

module.exports = router
