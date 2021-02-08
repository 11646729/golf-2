import express from "express"
const router = express.Router()
const gtfsController = require("../../../controllers/transportControllers/v1/gtfsController")

// -------------------------------------------------------
// GTFS Route Catalogue home page
// -------------------------------------------------------
// GET index
router.get("/", gtfsController.transportIndex)

// -------------------------------------------------------
// GTFS Reduced Shapes
// -------------------------------------------------------
// GET all Reduced Shapes from the database
router.get("/shapes", gtfsController.getAllReducedShapes)

// GET a Reduced Shape by id
router.get("/shapes/:id", gtfsController.getOneReducedShape)

// -------------------------------------------------------
// GTFS Routes
// -------------------------------------------------------
// GET a Route by id (filename)
router.get("/routes/:id", gtfsController.getOneRoute)

// -------------------------------------------------------
// GTFS Route Filenames
// -------------------------------------------------------
// GET all GeoJSON Route filenames in the directory
router.get("/filenames", gtfsController.getGeojsonFilenames)

// -------------------------------------------------------
// GTFS Reduced Routes
// -------------------------------------------------------
// GET all Reduced Routes from database
router.get("/gtfsReducedRoutes", gtfsController.getAllReducedRoutes)

// DELETE all Reduced Routes in the database
router.delete("/gtfsReducedRoutes", gtfsController.deleteAllReducedRoutes)

// -------------------------------------------------------
// GTFS Panel List Routes
// -------------------------------------------------------
// GET all Panel List Routes from database
router.get("/gtfsPanelListRoutes", gtfsController.getAllPanelListRoutes)

// PUT a Checkbox Selected/Non-Selected in the Panel List Routes Documents
router.put("/gtfsPanelListRoutes", gtfsController.putOnePanelListRoutes)

// DELETE all Panel List Routes in the database
router.delete("/gtfsPanelListRoutes", gtfsController.deleteAllPanelListRoutes)

// -------------------------------------------------------
// GTFS Stops
// -------------------------------------------------------
// GET all Stops
router.get("/stops", gtfsController.getAllStops)

// GET a Stop by id
router.get("/stops/:id", gtfsController.getOneStop)

// -------------------------------------------------------
// GTFS Reduced Stops
// -------------------------------------------------------
// GET all Reduced Stops from database
router.get("/gtfsReducedStops", gtfsController.getAllReducedStops)

// DELETE all Reduced Stops in the database
router.delete("/gtfsReducedStops", gtfsController.deleteAllReducedStops)

module.exports = router