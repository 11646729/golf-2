import express from "express"
const transportRouter = express.Router()
import transportController from "../controllers/transportController.js"

// -------------------------------------------------------
// Get Bus Catalogue Home Page
// -------------------------------------------------------
// transportRouter.get("/", transportController.index)

transportRouter.get("/", function (req, res) {
  res.send("Transport Controller home page")
})

// -------------------------------------------------------
// GET all Bus Route Shapes
// -------------------------------------------------------
// transportRouter.get("/shapes", transportController.getAllShapes)

transportRouter.get("/shapes", function (req, res) {
  res.send("Transport Controller home page")
})

// -------------------------------------------------------
// GET a Bus Route Shape
// -------------------------------------------------------
// transportRouter.get("/shape", transportController.getShape)

transportRouter.get("/shape", function (req, res) {
  res.send("Transport Controller get Shape home page")
})

// -------------------------------------------------------
// GET all Bus Stops
// -------------------------------------------------------
// router.get("/gstop", transportController.getAllStops)

// -------------------------------------------------------
// GET all Translink Bus Stops
// -------------------------------------------------------
// transportRouter.get("/stops", transportController.getAllStops)

transportRouter.get("/stops", function (req, res) {
  res.send("Transport Controller get Stops home page")
})

// -------------------------------------------------------
// Bus Route Agency
// -------------------------------------------------------
// transportRouter.get("/agencyname", transportController.getAgencyName)

transportRouter.get("/agencyname", function (req, res) {
  res.send("Transport Controller get Agency Name home page")
})

// -------------------------------------------------------
// GET all Bus Routes
// -------------------------------------------------------
// transportRouter.get("/routes", transportController.getAllRoutes)

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
