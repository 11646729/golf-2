import express from "express"
const transportRouter = express.Router()
import {
  index,
  getAllShapes,
  getShape,
  getAllStops,
  getAgencyName,
  getAllRoutes,
} from "../controllers/transportController.js"

// -------------------------------------------------------
// Get Bus Catalogue Home Page
// -------------------------------------------------------
transportRouter.get("/", index)

// -------------------------------------------------------
// GET all Bus Route Shapes
// -------------------------------------------------------
transportRouter.get("/shapes", getAllShapes)

// -------------------------------------------------------
// GET a Bus Route Shape
// -------------------------------------------------------
transportRouter.get("/shape", getShape)

// -------------------------------------------------------
// GET all Bus Stops
// -------------------------------------------------------
// router.get("/gstop", getAllStops)

// -------------------------------------------------------
// GET all Translink Bus Stops
// -------------------------------------------------------
transportRouter.get("/stops", getAllStops)

// -------------------------------------------------------
// Bus Route Agency
// -------------------------------------------------------
transportRouter.get("/agencyname", getAgencyName)

// -------------------------------------------------------
// GET all Bus Routes
// -------------------------------------------------------
transportRouter.get("/routes", getAllRoutes)

transportRouter.get("/routes", function (req, res) {
  res.send("Transport Controller get Routes home page")
})

// GET all Selected Panel List Bus Routes
// router.get("/groutes/:routevisible", transportController.getSelectedRoutes)

// GET all Translink Bus Routes
// router.get("/groutes/", transportController.getAllTranslinkRoutes)

// UPDATE Selected Status in the Bus Routes documents
// router.put("/groutes/:routenumber", transportController.putSelectedRoutes)

export default transportRouter
