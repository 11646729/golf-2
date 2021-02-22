import express from "express"
const router = express.Router()
const gtfsController = require("../../../controllers/transportControllers/v1/gtfsController")

// -------------------------------------------------------
// GTFS Bus Route Catalogue home page
// -------------------------------------------------------
// GET index
router.get("/", gtfsController.transportIndex)

// -------------------------------------------------------
// GTFS Bus Routes
// -------------------------------------------------------
// GET all Bus Routes
router.get("/gtfsRoutes", gtfsController.getAllRoutes)

// -------------------------------------------------------
// GTFS Panel List Bus Routes
// -------------------------------------------------------
// GET all Panel List Bus Routes
router.get("/gtfsPanelListRoutes", gtfsController.getAllPanelListRoutes)

// PUT Selected Status in the Panel List Bus Routes documents
router.put("/gtfsPanelListRoutes", gtfsController.putOnePanelListRoutes)

// -------------------------------------------------------
// GTFS Bus Stops
// -------------------------------------------------------
// GET all Bus Stops
router.get("/gtfsStops", gtfsController.getAllStops)

module.exports = router
