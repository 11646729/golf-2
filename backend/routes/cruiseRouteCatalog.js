import express from "express"
var cruiseRouter = express.Router()
import portArrivalsController from "../controllers/portArrivalsController.js"
import vesselController from "../controllers/vesselController.js"

// -------------------------------------------------------
// Cruise Routes
// GET catalogue home page
// -------------------------------------------------------
// cruiseRouter.get("/", portArrivalsController.index)

cruiseRouter.get("/", function (req, res) {
  res.send("Cruise Routes home page")
})

// -------------------------------------------------------
// GET all port arrivals from the database
// -------------------------------------------------------
// router.get("/portArrivals", portArrivalsController.getPortArrivals)

// -------------------------------------------------------
// GET a port arrival by id
// -------------------------------------------------------
// router.get("/portArrivals/:id", portArrivalsController.getPortArrival)

// -------------------------------------------------------
// POST a port arrival to the database
// -------------------------------------------------------
// cruiseRouter.post("/portArrivals", portArrivalsController.savePortArrival)

cruiseRouter.get("/portArrivals", function (req, res) {
  res.send("Cruise Router post home page")
})

// -------------------------------------------------------
// PUT a port arrival by id
// -------------------------------------------------------
// router.put("/portArrivals/:id", portArrivalsController.putPortArrival)

// -------------------------------------------------------
/// Vessel Routes ///
// GET all vessels from the database
// -------------------------------------------------------
// router.get("/vessel", vesselController.getVessels)

// -------------------------------------------------------
// GET a vessel by id
// -------------------------------------------------------
// router.get("/vessel/:id", vesselController.getVessel)

// -------------------------------------------------------
// POST a vessel to the database
// -------------------------------------------------------
// cruiseRouter.post("/vessel", vesselController.saveVessel)

cruiseRouter.get("/vessel", function (req, res) {
  res.send("Cruise Router Vessel home page")
})

// -------------------------------------------------------
// PUT a vessel by id
// -------------------------------------------------------
// router.put("/vessel/:id", vesselController.putVessel)

export default cruiseRouter
