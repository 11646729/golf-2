import express from "express"
var router = express.Router()

// Require controller modules
// const itinerary_controller = require("../../../controllers/cruiseShippingControllers/itineraryController")
const port_arrivals_controller = require("../../../controllers/cruiseShippingControllers/portArrivalsController")
const vessel_details_controller = require("../../../controllers/cruiseShippingControllers/vesselDetailsController")

/// PortArrivals Routes ///

// Get catalogue home page
router.get("/", port_arrivals_controller.index_get)

// Get all port arrivals from the database - only Belfast at present
router.get("/portArrivals", port_arrivals_controller.port_arrivals_get)

// Post a single arrival to the database
router.post("/portArrivals/add", port_arrivals_controller.port_arrivals_add)

/// Vessels Routes ///

// Get all vessels from the database
router.get("/vessels", vessel_details_controller.vessel_get)

// Post a single vessel to the database
router.post("/vessels/add", vessel_details_controller.vessel_add)

module.exports = router
