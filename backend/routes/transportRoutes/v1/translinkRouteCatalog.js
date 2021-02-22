import express from "express"
var router = express.Router()
const translinkController = require("../../../controllers/transportControllers/v1/translinkController")

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

module.exports = router
