import express from "express"
var router = express.Router()

// Require cruise controller modules
const port_arrivals_controller = require("../../../controllers/cruiseControllers/v1/portArrivalsController")
const vessel_details_controller = require("../../../controllers/cruiseControllers/v1/vesselDetailsController")

/// Cruise Routes ///
// GET catalogue home page
router.get("/", port_arrivals_controller.cruiseIndex)

/// PortArrivals Routes ///
// GET all port arrivals from the database - only Belfast at present
router.get("/portArrivals", port_arrivals_controller.findAll)

// GET a port arrival by id
router.get("/portArrivals/:id", port_arrivals_controller.findOne)

// POST a port arrival to the database
router.post("/portArrivals", port_arrivals_controller.create)

// UPDATE a port arrival by id
router.put("/portArrivals/:id", port_arrivals_controller.updateOne)

// DELETE all port arrival
router.delete("/portArrivals", port_arrivals_controller.deleteAll)

// DELETE a port arrival by id
router.delete("/portArrivals/:id", port_arrivals_controller.deleteOne)

/// Vessels Routes ///
// GET all vessel details from the database
router.get("/vesselDetails", vessel_details_controller.findAll)

// GET a vessel details by id
router.get("/vesselDetails/:id", vessel_details_controller.findOne)

// POST a vessel details to the database
router.post("/vesselDetails", vessel_details_controller.create)

// UPDATE a vessel details by id
router.put("/vesselDetails/:id", vessel_details_controller.updateOne)

// DELETE all vessel details
router.delete("/vesselDetails", vessel_details_controller.deleteAll)

// DELETE a vessel details by id
router.delete("/vesselDetails/:id", vessel_details_controller.deleteOne)

module.exports = router
