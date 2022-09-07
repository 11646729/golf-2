import express from "express"
var busRouter = express.Router()
import {
  index,
  importGtfsToSQLite,
  getAllShapes,
  getShape,
  getAllStops,
  getAgencyName,
  getAllRoutes,
} from "../controllers/busController.js"

// -------------------------------------------------------
// Get Bus Catalogue Home Page
// -------------------------------------------------------
busRouter.get("/", index)

// -------------------------------------------------------
// PUT all GTFS data into the SQL database
// -------------------------------------------------------
busRouter.put("/importGTFSData", importGtfsToSQLite)

// -------------------------------------------------------
// GET all Bus Route Shapes
// -------------------------------------------------------
busRouter.get("/shapes", getAllShapes)

// -------------------------------------------------------
// GET a Bus Route Shape
// -------------------------------------------------------
busRouter.get("/shape", getShape)

// -------------------------------------------------------
// GET all Bus Stops
// -------------------------------------------------------
// router.get("/gstop", getAllStops)

// -------------------------------------------------------
// GET all Translink Bus Stops
// -------------------------------------------------------
busRouter.get("/stops", getAllStops)

// -------------------------------------------------------
// Bus Route Agency
// -------------------------------------------------------
busRouter.get("/agencyname", getAgencyName)

// -------------------------------------------------------
// GET all Bus Routes
// -------------------------------------------------------
busRouter.get("/routes", getAllRoutes)

busRouter.get("/routes", function (req, res) {
  res.send("Bus Controller get Routes home page")
})

// GET all Selected Panel List Bus Routes
// router.get("/groutes/:routevisible", busController.getSelectedRoutes)

// GET all Translink Bus Routes
// router.get("/groutes/", busController.getAllTranslinkRoutes)

// UPDATE Selected Status in the Bus Routes documents
// router.put("/groutes/:routenumber", busController.putSelectedRoutes)

export default busRouter
