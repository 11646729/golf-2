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
// GTFS Reduced Bus Routes
// -------------------------------------------------------
// GET a Reduced Bus Route by id (filename)
router.get("/gtfsReducedRoutes/:id", gtfsController.getOneReducedRoute)

// GET all Reduced Bus Routes
router.get("/gtfsReducedRoutes", gtfsController.getAllReducedRoutes)

// DELETE all Reduced Bus Routes
router.delete("/gtfsReducedRoutes", gtfsController.deleteAllReducedRoutes)

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
// GTFS Reduced Bus Stops
// -------------------------------------------------------
// GET all Reduced Bus Stops
router.get("/gtfsReducedStops", gtfsController.getAllReducedStops)

// DELETE all Reduced Bus Stops
router.delete("/gtfsReducedStops", gtfsController.deleteAllReducedStops)

module.exports = router
