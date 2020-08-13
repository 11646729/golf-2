import express from "express"
var router = express.Router()

// Require transport controller module
const transport_controller = require("../../../controllers/transportControllers/v1//translinkTransportController")

/// Transport Routes ///
// GET catalogue home page
router.get("/", transport_controller.transportIndex)

// GET all Translink bus stops from the database
router.get("/translinkstops", transport_controller.getAllStops)

// GET a Translink bus stop by id
// router.get("/translinkstops/:id", transport_controller.getOneStop)

// GET all Translink shapes from the database
router.get("/translinkshapes", transport_controller.getAllModifiedShapes)

// GET a Translink shape by id
// router.get("/translinkshapes/:id", transport_controller.getOneModifiedShape)

// POST a temperature reading to the database
// router.post("/temperatureReadings/:id", transport_controller.create)

// UPDATE a temperature reading by id
// router.put("/temperatureReadings/:id", transport_controller.updateOne)

// DELETE all temperature readings
// router.delete("/temperatureReadings", transport_controller.deleteAll)

// DELETE a temperature reading by id
// router.delete("/temperatureReadings/:id", transport_controller.deleteOne)

module.exports = router
