import express from "express"
const router = express.Router()
const transportController = require("../controllers/transportController")

// -------------------------------------------------------
// Bus Catalogue Home Page
// -------------------------------------------------------
// GET index
router.get("/", transportController.index)

// -------------------------------------------------------
// Bus Route Shapes
// -------------------------------------------------------
// GET all Bus Route Shapes
router.get("/shapes/", transportController.getAllShapes)

// GET a Bus Route Shape
router.get("/shape/", transportController.getShape)

// -------------------------------------------------------
// Bus Stops
// -------------------------------------------------------
// GET all Bus Stops
// router.get("/gstop/", transportController.getAllStops)

// GET all Translink Bus Stops
router.get("/stops/", transportController.getAllStops)

// -------------------------------------------------------
// Bus Route Agency
// -------------------------------------------------------
// GET all Bus Route Shapes
router.get("/agencyname/", transportController.getAgencyName)

// -------------------------------------------------------
// Bus Routes
// -------------------------------------------------------
// GET all Bus Routes
router.get("/routes/", transportController.getAllRoutes)

// GET all Selected Panel List Bus Routes
// router.get("/groutes/:routevisible", transportController.getSelectedRoutes)

// GET all Translink Bus Routes
// router.get("/groutes/", transportController.getAllTranslinkRoutes)

// UPDATE Selected Status in the Bus Routes documents
// router.put("/groutes/:routenumber", transportController.putSelectedRoutes)

module.exports = router
