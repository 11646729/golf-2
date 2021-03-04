import express from "express"
var router = express.Router()
const portArrivalsController = require("../../../controllers/cruiseControllers/v1/portArrivalsController")
const vesselController = require("../../../controllers/cruiseControllers/v1/vesselController")

// -------------------------------------------------------
// Cruise Routes
// GET catalogue home page
// -------------------------------------------------------
router.get("/", portArrivalsController.index)

// -------------------------------------------------------
/// PortArrivals Routes ///
// GET all port arrivals from the database
// -------------------------------------------------------
router.get("/portArrivals", portArrivalsController.getPortArrivals)

// -------------------------------------------------------
// GET a port arrival by id
// -------------------------------------------------------
router.get("/portArrivals/:id", portArrivalsController.getPortArrival)

// -------------------------------------------------------
// POST a port arrival to the database
// -------------------------------------------------------
router.post("/portArrivals", portArrivalsController.postPortArrival)

// -------------------------------------------------------
// PUT a port arrival by id
// -------------------------------------------------------
router.put("/portArrivals/:id", portArrivalsController.putPortArrival)

// -------------------------------------------------------
/// Vessel Routes ///
// GET all vessels from the database
// -------------------------------------------------------
router.get("/vessel", vesselController.getVessels)

// -------------------------------------------------------
// GET a vessel by id
// -------------------------------------------------------
router.get("/vessel/:id", vesselController.getVessel)

// -------------------------------------------------------
// POST a vessel to the database
// -------------------------------------------------------
router.post("/vessel", vesselController.postVessel)

// -------------------------------------------------------
// PUT a vessel by id
// -------------------------------------------------------
router.put("/vessel/:id", vesselController.putVessel)

module.exports = router
