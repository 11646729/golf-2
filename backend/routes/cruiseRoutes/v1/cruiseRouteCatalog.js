import express from "express"
var router = express.Router()

// Require cruise controller modules
const portArrivalsController = require("../../../controllers/cruiseControllers/v1/portArrivalsController")
const vesselController = require("../../../controllers/cruiseControllers/v1/vesselController")

/// Cruise Routes ///
// GET catalogue home page
router.get("/", portArrivalsController.cruiseIndex)

/// PortArrivals Routes ///
// GET all port arrivals from the database - only Belfast at present
router.get("/portArrivals", portArrivalsController.findPortArrivals)

// GET a port arrival by id
router.get("/portArrivals/:id", portArrivalsController.findPortArrival)

// POST a port arrival to the database
router.post("/portArrivals", portArrivalsController.createPortArrival)

// UPDATE a port arrival by id
router.put("/portArrivals/:id", portArrivalsController.updatePortArrival)

/// Vessel Routes ///
// GET all vessels from the database
router.get("/vessel", vesselController.findVessels)

// GET a vessel by id
router.get("/vessel/:id", vesselController.findVessel)

// POST a vessel to the database
router.post("/vessel", vesselController.createVessel)

// UPDATE a vessel by id
router.put("/vessel/:id", vesselController.updateVessel)

module.exports = router
