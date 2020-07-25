import express from "express"
var router = express.Router()

// Require transport controller module
const gtfs_transport_controller = require("../../../controllers/transportControllers/v1/gtfsTransportController")

/// Transport Routes ///
// GET catalogue home page
router.get("/", gtfs_transport_controller.gtfsTransportIndex)

// GET all Translink bus stops from the database
router.get("/stops", gtfs_transport_controller.getAllStops)

// // POST a temperature reading to the database
// router.post("/temperatureReadings/:id", gtfs_transport_controller.create)

// // UPDATE a temperature reading by id
// router.put("/temperatureReadings/:id", gtfs_transport_controller.updateOne)

// // DELETE all temperature readings
// router.delete("/temperatureReadings", gtfs_transport_controller.deleteAll)

// // DELETE a temperature reading by id
// router.delete("/temperatureReadings/:id", gtfs_transport_controller.deleteOne)

module.exports = router
