import express from "express"
var cruiseRouter = express.Router()
import {
  index,
  getPortArrivals,
  savePortArrival,
} from "../controllers/portArrivalsController.js"
import {
  getVesselPosition,
  getVesselPositionTest,
  saveVessel,
} from "../controllers/vesselController.js"

// -------------------------------------------------------
// Cruise Routes
// GET catalogue home page
// -------------------------------------------------------
cruiseRouter.get("/", index)

// -------------------------------------------------------
// GET all port arrivals from the database
// -------------------------------------------------------
cruiseRouter.get("/portArrivals", getPortArrivals)

// -------------------------------------------------------
// GET a port arrival by id
// -------------------------------------------------------
// cruiseRouter.get("/portArrivals/:id", getPortArrival)

// -------------------------------------------------------
// POST a port arrival to the database
// -------------------------------------------------------
cruiseRouter.post("/portArrivals", savePortArrival)

// -------------------------------------------------------
// PUT a port arrival by id
// -------------------------------------------------------
// cruiseRouter.put("/portArrivals/:id", putPortArrival)

// -------------------------------------------------------
/// Vessel Routes ///
// GET all vessels from the database
// -------------------------------------------------------
// cruiseRouter.get("/vessel", getVessels)

// -------------------------------------------------------
// GET a vessel by id
// -------------------------------------------------------
// cruiseRouter.get("/vessel/:id", getVessel)

// -------------------------------------------------------
// GET all vessel positions
// -------------------------------------------------------
cruiseRouter.get("/vesselPosition", getVesselPosition)

// -------------------------------------------------------
// GET all vessel positions
// -------------------------------------------------------
cruiseRouter.get("/vesselPositionTest", getVesselPositionTest)

// -------------------------------------------------------
// POST a vessel to the database
// -------------------------------------------------------
cruiseRouter.post("/vessel", saveVessel)

// -------------------------------------------------------
// PUT a vessel by id
// -------------------------------------------------------
// cruiseRouter.put("/vessel/:id", putVessel)

export default cruiseRouter
