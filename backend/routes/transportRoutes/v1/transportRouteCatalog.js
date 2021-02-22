import express from "express"
var router = express.Router()
const translinkController = require("../../../controllers/transportControllers/v1/translinkController")
const gtfsController = require("../../../controllers/transportControllers/v1/gtfsController")

// -------------------------------------------------------
// Translink Bus Route Catalogue Home Page
// -------------------------------------------------------
// GET index
router.get("/", translinkController.transportIndex)

// -------------------------------------------------------
// Translink Bus Shapes
// -------------------------------------------------------
// GET all Shapes
router.get("/translinkShapes", translinkController.getAllTranslinkShapes)

// -------------------------------------------------------
// Translink Bus Routes
// -------------------------------------------------------
// GET all Bus Routes
// router.get("/translinkRoutes", translinkController.getAllRoutes)

// -------------------------------------------------------
// Translink Bus Stops
// -------------------------------------------------------
// GET all Bus Stops
router.get("/translinkStops", translinkController.getAllTranslinkStops)

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
