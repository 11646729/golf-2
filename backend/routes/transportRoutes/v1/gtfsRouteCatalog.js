import express from "express"
const router = express.Router()
const gtfsController = require("../../../controllers/transportControllers/v1/gtfsController")

// -------------------------------------------------------
// GTFS Bus Route Catalogue home page
// -------------------------------------------------------
// GET index
router.get("/", gtfsController.transportIndex)

// -------------------------------------------------------
// GTFS Bus Route GeoJSON Filenames
// -------------------------------------------------------
// GET all GeoJSON Route filenames in the directory
router.get("/filenames", gtfsController.getGeojsonFilenames)

// -------------------------------------------------------
// GTFS Bus Routes
// -------------------------------------------------------
// GET a Bus Route by id (filename)
router.get("/gtfsRoutes/:id", gtfsController.getOneRoute)

// GET all Bus Routes
router.get("/gtfsRoutes", gtfsController.getAllRoutes)

// DELETE all Bus Routes
router.delete("/gtfsRoutes", gtfsController.deleteAllRoutes)

// -------------------------------------------------------
// GTFS Panel List Bus Routes
// -------------------------------------------------------
// GET all Panel List Bus Routes
router.get("/gtfsPanelListRoutes", gtfsController.getAllPanelListRoutes)

// PUT Selected Status in the Panel List Bus Routes documents
router.put("/gtfsPanelListRoutes", gtfsController.putOnePanelListRoutes)

// DELETE all Panel List Bus Routes
router.delete("/gtfsPanelListRoutes", gtfsController.deleteAllPanelListRoutes)

// -------------------------------------------------------
// GTFS Bus Stops
// -------------------------------------------------------
// GET all Bus Stops
router.get("/gtfsStops", gtfsController.getAllStops)

// DELETE all Bus Stops
router.delete("/gtfsStops", gtfsController.deleteAllStops)

module.exports = router
