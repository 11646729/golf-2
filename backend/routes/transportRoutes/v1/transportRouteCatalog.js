import express from "express"
var router = express.Router()
const transportController = require("../../../controllers/transportControllers/v1/transportController")

// -------------------------------------------------------
// Bus Catalogue Home Page
// -------------------------------------------------------
// GET index
router.get("/", transportController.index)

// -------------------------------------------------------
// Translink Bus Shapes
// -------------------------------------------------------
// GET all Shapes
router.get("/tshapes/", transportController.getAllTranslinkShapes)

// -------------------------------------------------------
// Bus Routes
// -------------------------------------------------------
// GET all Bus Routes
router.get("/groutes/", transportController.getAllGtfsRoutes)

// GET all Bus Routes
// router.get("/troutes/", transportController.getAllTranslinkRoutes)

// -------------------------------------------------------
// Panel List Bus Routes
// -------------------------------------------------------
// GET all Panel List Bus Routes
router.get("/gplroutes/", transportController.getAllPanelListGtfsRoutes)

// PUT Selected Status in the Panel List Bus Routes documents
router.put("/gplroutes/", transportController.putOnePanelListGtfsRoutes)

// -------------------------------------------------------
// Bus Stops
// -------------------------------------------------------
// GET all Bus Stops
router.get("/gstops/", transportController.getAllGtfsStops)

// GET all Bus Stops
router.get("/tstops/", transportController.getAllTranslinkStops)

module.exports = router
