import express from "express"
const router = express.Router()
const gtfs_transport_controller = require("../../../controllers/transportControllers/v1/gtfsTransportController")

// -------------------------------------------------------
// Catalogue home page
// -------------------------------------------------------

router.get("/", gtfs_transport_controller.transportIndex)

// -------------------------------------------------------
// Stops
// -------------------------------------------------------

// GET all Stops
router.get("/stops", gtfs_transport_controller.getAllStops)

// GET a Stop by id
router.get("/stops/:id", gtfs_transport_controller.getOneStop)

// -------------------------------------------------------
// Reduced Shapes
// -------------------------------------------------------

// GET all Reduced Shapes from the database
router.get("/shapes", gtfs_transport_controller.getAllReducedShapes)

// GET a Reduced Shape by id
router.get("/shapes/:id", gtfs_transport_controller.getOneReducedShape)

// -------------------------------------------------------
// Routes
// -------------------------------------------------------

// GET a Route by id (filename)
router.get("/routes/:id", gtfs_transport_controller.getOneRoute)

// -------------------------------------------------------
// Filenames
// -------------------------------------------------------

// GET all GeoJSON filenames in the directory
router.get("/filenames", gtfs_transport_controller.getGeojsonFilenames)

// -------------------------------------------------------
// Reduced Routes
// -------------------------------------------------------

// GET all Reduced Routes from database
router.get("/reducedRoutes", gtfs_transport_controller.getAllReducedRoutes)

// DELETE all Reduced Routes in the database
router.delete(
  "/reducedRoutes",
  gtfs_transport_controller.deleteAllReducedRoutes
)

// -------------------------------------------------------
// Unique Reduced Routes
// -------------------------------------------------------

// GET all Unique Reduced Routes from database
router.get(
  "/uniqueReducedRoutes",
  gtfs_transport_controller.getAllUniqueReducedRoutes
)

// PUT a Checkbox Selected/Non-Selected in the Unique Reduced Routes Documents
router.put(
  "/uniqueReducedRoutes",
  gtfs_transport_controller.putOneUniqueReducedRoutes
)

// DELETE all Unique Reduced Routes in the database
router.delete(
  "/uniqueReducedRoutes",
  gtfs_transport_controller.deleteAllUniqueReducedRoutes
)

// -------------------------------------------------------
// Reduced Stops
// -------------------------------------------------------

// GET all Reduced Stops from database
router.get("/reducedStops", gtfs_transport_controller.getAllReducedStops)

// DELETE all Reduced Stops in the database
router.delete("/reducedStops", gtfs_transport_controller.deleteAllReducedStops)

module.exports = router
