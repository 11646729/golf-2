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
// GET all Shapes
router.get("/tshape/", transportController.getAllTranslinkShapes)

// -------------------------------------------------------
// Bus Routes
// -------------------------------------------------------
// GET all Bus Routes
router.get("/groute/", transportController.getAllGtfsRoutes)

// GET all Bus Routes
// router.get("/troute/", transportController.getAllTranslinkRoutes)

// -------------------------------------------------------
// Panel List Bus Routes
// -------------------------------------------------------
// GET all Panel List Bus Routes
router.get("/gplroute/", transportController.getAllPanelListGtfsRoutes)

// GET all Selected Panel List Bus Routes
router.get(
  "/gplroute/:routevisible",
  transportController.getSelectedPanelListGtfsRoutes
)

// PUT Selected Status in the Panel List Bus Routes documents
router.put(
  "/gplroute/:routenumber",
  transportController.putOnePanelListGtfsRoutes
)

// -------------------------------------------------------
// Bus Stops
// -------------------------------------------------------
// GET all Bus Stops
router.get("/gstop/", transportController.getAllGtfsStops)

// GET all Bus Stops
router.get("/tstop/", transportController.getAllTranslinkStops)

module.exports = router
