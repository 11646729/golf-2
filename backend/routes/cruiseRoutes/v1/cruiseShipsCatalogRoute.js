import express from "express"
var router = express.Router()

// Require controller modules
// const cruise_controller = require("../../../controllers/cruiseShippingControllers/cruiseController")
// const itinerary_controller = require("../../../controllers/cruiseShippingControllers/itineraryController")
const port_arrivals_controller = require("../../../controllers/cruiseShippingControllers/portArrivalsController")
// const vessel_controller = require("../../../controllers/cruiseShippingControllers/vesselController")

/// CRUISE ROUTES ///

// Get catalogue home page
router.get("/", port_arrivals_controller.index)

// Get all port arrivals - only Belfast at present
router.get("/portArrivals", port_arrivals_controller.port_arrivals)

module.exports = router
