import express from "express"
var router = express.Router()
const translinkController = require("../../../controllers/transportControllers/v1/translinkController")

// -------------------------------------------------------
// Translink Bus Route Catalogue Home Page
// -------------------------------------------------------
// GET index
router.get("/", translinkController.transportIndex)

// -------------------------------------------------------
// Translink Bus Routes
// -------------------------------------------------------
// GET all Raw Shape Data
router.get("/translinkShapes", translinkController.getAllShapes)

// DELETE all Raw Shape Data
router.delete("/translinkShapes", translinkController.deleteAllShapes)

// -------------------------------------------------------
// Translink Bus Routes
// -------------------------------------------------------
// GET all Bus Routes
router.get("/translinkRoutes", translinkController.getAllRoutes)

// -------------------------------------------------------
// Translink Bus Stops
// -------------------------------------------------------
// GET all Bus Stops
router.get("/translinkStops", translinkController.getAllTranslinkStops)

// DELETE all Bus Stops
router.delete("/translinkStops", translinkController.deleteAllStops)

module.exports = router
