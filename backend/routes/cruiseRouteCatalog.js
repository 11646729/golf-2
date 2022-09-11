import express from "express"
import {
  index,
  prepareEmptyPortArrivalsTable,
  getPortArrivals,
  savePortArrival,
} from "../controllers/portArrivalsController.js"
import {
  prepareEmptyVesselsTable,
  getVesselPosition,
  saveVessel,
} from "../controllers/vesselController.js"
import { importPortArrivalsAndVessels } from "../cruiseScrapingRoutines.js"

var cruiseRouter = express.Router()

// ---------------------------------------------------
// Cruise Routes
// ---------------------------------------------------
// GET catalogue home page
cruiseRouter.get("/", index)

// ---------------------------------------------------
// Port Arrivals
// ---------------------------------------------------
// Prepare the Port Arrivals table in the database
cruiseRouter.post("/preparePortArrivalsTable", prepareEmptyPortArrivalsTable)

// POST a Port Arrival to the database
cruiseRouter.post("/portArrivals", savePortArrival)

// GET all Port Arrivals from the database
cruiseRouter.get("/portArrivals", getPortArrivals)

// GET a Port Arrival by id
// cruiseRouter.get("/portArrivals/:id", getPortArrival)

// PUT a Port Arrival by id
// cruiseRouter.put("/portArrivals/:id", putPortArrival)

// ---------------------------------------------------
// Vessel Routes
// ---------------------------------------------------
// Prepare the vessels table in the database
cruiseRouter.post("/prepareVesselsTable", prepareEmptyVesselsTable)

// POST all Port Arrivals & Vessels data to the database
cruiseRouter.post(
  "/importPortArrivalsAndVesselsData",
  importPortArrivalsAndVessels
)

// GET all vessels from the database
// cruiseRouter.get("/vessel", getVessels)

// GET a vessel by id
// cruiseRouter.get("/vessel/:id", getVessel)

// GET all vessel positions
cruiseRouter.get("/vesselPositions", getVesselPosition)

// POST a vessel to the database
cruiseRouter.post("/vessel", saveVessel)

// PUT a vessel by id
// cruiseRouter.put("/vessel/:id", putVessel)

export default cruiseRouter
