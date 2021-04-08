import { RouteSchema } from "../../../models/transportModels/v1/routeSchema"
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
export const getAllRoutes = async (req, res) => {
  RouteSchema.find(req.query)
    .then((routeSchema) => res.json(routeSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Get Panel Selected Routes
export const getSelectedRoutes = async (req, res) => {
  const filter = { routeVisible: "true" }

  RouteSchema.find(filter)
    .then((routeSchema) => res.json(routeSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Update Selected Routes
export const putSelectedRoutes = async (req, res) => {
  const filter = { routeNumber: req.body.routeNumber }
  const update = { routeVisible: req.body.routeVisible }

  RouteSchema.updateMany(filter, update)
    .then((routeSchema) => res.json(routeSchema))
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
