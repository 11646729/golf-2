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

// POST a single arrival to the database
router.post("/portArrivals", port_arrivals_controller.create)

/// Vessels Routes ///
// GET all vessels from the database
router.get("/vesselDetails", vessel_details_controller.findAll)

// POST a single vessel to the database
router.post("/vesselDetails", vessel_details_controller.create)

module.exports = router
