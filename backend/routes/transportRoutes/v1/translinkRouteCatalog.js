import express from "express"
var router = express.Router()
const translinkController = require("../../../controllers/transportControllers/v1/translinkController")

// -------------------------------------------------------
// Translink Route Catalogue home page
// -------------------------------------------------------
// GET index
router.get("/", translinkController.transportIndex)

// -------------------------------------------------------
// Translink Stops
// -------------------------------------------------------
// GET all Stops
router.get("/stops", translinkController.getAllStops)

// -------------------------------------------------------
// Translink Shapes
// -------------------------------------------------------
// GET all Translink Shapes
router.get("/rawRoutes", translinkController.getAllRawTranslinkRoutes)

// GET all Translink Modified Shapes
router.get("/modifiedshapes", translinkController.getAllModifiedShapes)

// GET a Translink bus stop by id
// router.get("/stops/:id", translinkController.getOneStop)

// GET a Translink shape by id
// router.get("/shapes/:id", translinkController.getOneModifiedShape)

// POST a temperature reading to the database
// router.post("/temperatureReadings/:id", translinkController.create)

// UPDATE a temperature reading by id
// router.put("/temperatureReadings/:id", translinkController.updateOne)

// DELETE all temperature readings
// router.delete("/temperatureReadings", translinkController.deleteAll)

// DELETE a temperature reading by id
// router.delete("/temperatureReadings/:id", translinkController.deleteOne)

module.exports = router
