import express from "express"
var router = express.Router()
import { getAllVesselArrivals } from "../../../scrapeArrivals"

// Require controller modules
// var cruise_controller = require("../../../controllers/cruiseShippingControllers/cruiseController")
// var itinerary_controller = require("../../../controllers/cruiseShippingControllers/itineraryController")
// import port_controller from "../../../controllers/cruiseShippingControllers/portController"
// var vessel_controller = require("../../../controllers/cruiseShippingControllers/vesselController")

/// CRUISE ROUTES ///

// GET catalogue home page
// router.get("/", port_controller.index)

router.get("/port", async (req, res, next) => {
  console.log("Scraping!")

  const allArrivals = await getAllVesselArrivals()

  //  console.log(allArrivals)
  res.json(allArrivals)
})

module.exports = router
