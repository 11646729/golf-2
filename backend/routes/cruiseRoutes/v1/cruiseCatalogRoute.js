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
router.get("/portArrivals", port_arrivals_controller.port_arrivals_get)

// POST a single arrival to the database
router.post("/portArrivals/add", port_arrivals_controller.port_arrivals_add)

/// Vessels Routes ///
// GET all vessels from the database
router.get("/vesselDetails", vessel_details_controller.vessel_get)

// POST a single vessel to the database
router.post("/vessels/vesselDetails/:id", vessel_details_controller.vessel_add)

module.exports = router
