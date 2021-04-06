import { GtfsRouteSchema } from "../../../models/transportModels/v1/gtfsRouteSchema"
import { StopSchema } from "../../../models/transportModels/v1/stopSchema"
import { ShapeSchema } from "../../../models/transportModels/v1/shapeSchema"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/transport/
// -------------------------------------------------------
export const index = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Bus Shapes
// Path: localhost:5000/api/transport/tshape/
// -------------------------------------------------------
const Keys = ["7", "8", "9", "10", "11", "16", "17"]
// const Keys = ["1", "2", "3", "4", "5", "6", "3195", "3196"]
// const Keys = ["1", "2", "3", "4", "5", "6"]

export const getAllShapes = async (req, res) => {
  ShapeSchema.find({ shapeKey: Keys }) // 3 = Train, 1&2 = Route Endpoints
    .then((shapeSchema) => res.json(shapeSchema))
    .catch((err) => res.status(400).json("Error " + err))
}
// -------------------------------------------------------
// Bus Routes
// Path: localhost:5000/api/transport/groutes/
// -------------------------------------------------------
export const getAllGtfsRoutes = async (req, res) => {
  GtfsRouteSchema.find(req.query)
    .then((gtfsRouteSchema) => res.json(gtfsRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Get Panel Selected Routes
export const getSelectedGtfsRoutes = async (req, res) => {
  const filter = { routeVisible: "true" }

  GtfsRouteSchema.find(filter)
    .then((gtfsRouteSchema) => res.json(gtfsRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Update Selected Routes
export const putSelectedGtfsRoutes = async (req, res) => {
  const filter = { routeNumber: req.body.routeNumber }
  const update = { routeVisible: req.body.routeVisible }

  GtfsRouteSchema.updateMany(filter, update)
    .then((gtfsRouteSchema) => res.json(gtfsRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Bus Stops
// Path: localhost:5000/api/transport/stops/
// -------------------------------------------------------
export const getAllStops = async (req, res) => {
  StopSchema.find(req.query)
    .then((stopSchema) => res.json(stopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}
