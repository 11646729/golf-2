import express from "express"
var router = express.Router()

// Require transport controller module
const gtfs_transport_controller = require("../../../controllers/transportControllers/v1/gtfsTransportController")

/// Transport Routes ///
// GET catalogue home page
router.get("/", gtfs_transport_controller.gtfsTransportIndex)

// GET all bus stops
router.get("/stops", gtfs_transport_controller.gtfsGetAllStops)

// GET a bus stop by id
router.get("/stops/:id", gtfs_transport_controller.gtfsGetOneStop)

// GET all shapes from the database
router.get("/shapes", gtfs_transport_controller.gtfsGetAllReducedShapes)

// GET a shape by id
router.get("/shapes/:id", gtfs_transport_controller.gtfsGetOneReducedShape)

// GET a route by id (filename)
router.get("/routes/:id", gtfs_transport_controller.gtfsGetOneRoute)

// GET all GeoJSON filenames in the directory
router.get("/filenames", gtfs_transport_controller.gtfsGetFilenames)

// POST a shape to the database
// router.post("/shapes/:id", gtfs_transport_controller.create)

// UPDATE a bus stop reading by id
// router.put("/stops/:id", gtfs_transport_controller.updateOne)

// UPDATE a shape by id
// router.put("/shapes/:id", gtfs_transport_controller.updateOne)

// DELETE all bus stops
// router.delete("/stops", gtfs_transport_controller.deleteAll)

// DELETE all shapes
// router.delete("/shapes", gtfs_transport_controller.deleteAll)

// DELETE a bus stop by id
// router.delete("/stops/:id", gtfs_transport_controller.deleteOne)

// DELETE a shape by id
// router.delete("/shapes/:id", gtfs_transport_controller.deleteOne)

module.exports = router
