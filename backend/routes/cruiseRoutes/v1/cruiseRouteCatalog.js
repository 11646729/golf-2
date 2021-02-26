import express from "express"
var router = express.Router()

// Require cruise controller modules
const port_arrivals_controller = require("../../../controllers/cruiseControllers/v1/portArrivalsController")
const vesselController = require("../../../controllers/cruiseControllers/v1/vesselController")

/// Cruise Routes ///
// GET catalogue home page
router.get("/", port_arrivals_controller.cruiseIndex)

/// PortArrivals Routes ///
// GET all port arrivals from the database - only Belfast at present
router.get("/portArrivals", port_arrivals_controller.findAll)

// GET a port arrival by id
router.get("/portArrivals/:id", port_arrivals_controller.findOne)

// POST a port arrival to the database
router.post("/portArrivals", port_arrivals_controller.create)

// UPDATE a port arrival by id
router.put("/portArrivals/:id", port_arrivals_controller.updateOne)

// DELETE all port arrival
router.delete("/portArrivals", port_arrivals_controller.deleteAllPortArrivals)

// DELETE a port arrival by id
router.delete(
  "/portArrivals/:id",
  port_arrivals_controller.deleteOnePortArrival
)

/// Vessel Routes ///
// GET all vessels from the database
router.get("/vessel", vesselController.findAll)

// GET a vessel by id
router.get("/vessel/:id", vesselController.findOne)

// POST a vessel to the database
router.post("/vessel", vesselController.create)

// UPDATE a vessel by id
router.put("/vessel/:id", vesselController.updateOne)

// DELETE all vessels from the database
router.delete("/vessel", vesselController.deleteAllVessels)

// DELETE a vessel by id
router.delete("/vessel/:id", vesselController.deleteOneVessel)

module.exports = router
