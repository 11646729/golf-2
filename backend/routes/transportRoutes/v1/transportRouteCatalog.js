import express from "express"
var router = express.Router()
const transportController = require("../../../controllers/transportControllers/v1/transportController")

// -------------------------------------------------------
// Translink Bus Route Catalogue Home Page
// -------------------------------------------------------
// GET index
router.get("/", transportController.transportIndex)

// -------------------------------------------------------
// Translink Bus Shapes
// -------------------------------------------------------
// GET all Shapes
router.get("/translinkShapes", transportController.getAllTranslinkShapes)

// -------------------------------------------------------
// Translink Bus Routes
// -------------------------------------------------------
// GET all Bus Routes
// router.get("/translinkRoutes", transportController.getAllTranslinkRoutes)

// -------------------------------------------------------
// Translink Bus Stops
// -------------------------------------------------------
// GET all Bus Stops
router.get("/translinkStops", transportController.getAllTranslinkStops)

// -------------------------------------------------------
// GTFS Bus Routes
// -------------------------------------------------------
// GET all Bus Routes
router.get("/gtfsRoutes", transportController.getAllGtfsRoutes)

// -------------------------------------------------------
// GTFS Panel List Bus Routes
// -------------------------------------------------------
// GET all Panel List Bus Routes
router.get(
  "/gtfsPanelListRoutes",
  transportController.getAllPanelListGtfsRoutes
)

// PUT Selected Status in the Panel List Bus Routes documents
router.put(
  "/gtfsPanelListRoutes",
  transportController.putOnePanelListGtfsRoutes
)

// -------------------------------------------------------
// GTFS Bus Stops
// -------------------------------------------------------
// GET all Bus Stops
router.get("/gtfsStops", transportController.getAllGtfsStops)

module.exports = router
