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
router.get("/portArrivals", portArrivalsController.findAll)

// GET a port arrival by id
router.get("/portArrivals/:id", portArrivalsController.findOne)

// POST a port arrival to the database
router.post("/portArrivals", portArrivalsController.create)

// UPDATE a port arrival by id
router.put("/portArrivals/:id", portArrivalsController.updateOne)

/// Vessel Routes ///
// GET all vessels from the database
router.get("/vessel", vesselController.findAll)

// GET a vessel by id
router.get("/vessel/:id", vesselController.findOne)

// POST a vessel to the database
router.post("/vessel", vesselController.create)

// UPDATE a vessel by id
router.put("/vessel/:id", vesselController.updateOne)

module.exports = router
