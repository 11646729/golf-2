import express from "express"
var router = express.Router()

// Require weather controller module
const weather_controller = require("../../../controllers/weatherControllers/v1/weatherController")

/// Weather Routes ///
// GET catalogue home page
router.get("/", weather_controller.index)

// GET all temperature readings from the database
router.get("/temperatureReadings", weather_controller.fetchAllReadings)

// POST a temperature reading to the database
router.post("/temperatureReadings/:id", weather_controller.create)

// UPDATE a temperature reading by id
router.put("/temperatureReadings/:id", weather_controller.updateOne)

// DELETE all temperature readings
router.delete("/temperatureReadings", weather_controller.deleteAll)

// DELETE a temperature reading by id
router.delete("/temperatureReadings/:id", weather_controller.deleteOne)

module.exports = router
