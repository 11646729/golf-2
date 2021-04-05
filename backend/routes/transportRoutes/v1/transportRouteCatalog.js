import express from "express"
const router = express.Router()
const transportController = require("../../../controllers/transportControllers/v1/transportController")

// -------------------------------------------------------
// Bus Catalogue Home Page
// -------------------------------------------------------
// GET index
router.get("/", transportController.index)

// -------------------------------------------------------
// Translink Bus Shapes
// -------------------------------------------------------
// GET all Translink Shapes
router.get("/tshape/", transportController.getAllTranslinkShapes)

// -------------------------------------------------------
// Bus Routes
// -------------------------------------------------------
// GET all Bus Routes
router.get("/groute/", transportController.getAllGtfsRoutes)

// GET all Selected Panel List Bus Routes
router.get("/groute/:routevisible", transportController.getSelectedGtfsRoutes)

// GET all Translink Bus Routes
// router.get("/groute/", transportController.getAllTranslinkRoutes)

// UPDATE Selected Status in the Bus Routes documents
router.put("/groute/:routenumber", transportController.putSelectedGtfsRoutes)

// -------------------------------------------------------
// Bus Stops
// -------------------------------------------------------
// GET all Bus Stops
router.get("/gstop/", transportController.getAllStops)

// GET all Translink Bus Stops
router.get("/tstop/", transportController.getAllTranslinkStops)

module.exports = router
