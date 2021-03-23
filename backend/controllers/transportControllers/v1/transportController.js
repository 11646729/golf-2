import { GtfsRouteSchema } from "../../../models/transportModels/v1/gtfsRouteSchema"
import { GtfsStopSchema } from "../../../models/transportModels/v1/gtfsStopSchema"
import { TranslinkShapeSchema } from "../../../models/transportModels/v1/translinkShapeSchema"
import { TranslinkStopSchema } from "../../../models/transportModels/v1/translinkStopSchema"

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

export const getAllTranslinkShapes = async (req, res) => {
  TranslinkShapeSchema.find({ shapeKey: Keys }) // 3 = Train, 1&2 = Route Endpoints
    .then((translinkShapeSchema) => res.json(translinkShapeSchema))
    .catch((err) => res.status(400).json("Error " + err))
}
// -------------------------------------------------------
// Bus Routes
// Path: localhost:5000/api/transport/groute/
// -------------------------------------------------------
export const getAllGtfsRoutes = async (req, res) => {
  GtfsRouteSchema.find({})
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
// Path: localhost:5000/api/transport/gstop/
// -------------------------------------------------------
export const getAllGtfsStops = async (req, res) => {
  GtfsStopSchema.find({})
    .then((gtfsStopSchema) => res.json(gtfsStopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

export const getAllTranslinkStops = async (req, res) => {
  TranslinkStopSchema.find({})
    .then((translinkStopSchema) => res.json(translinkStopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}
