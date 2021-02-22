import { GtfsRouteSchema } from "../../../models/transportModels/v1/gtfsRouteSchema"
import { GtfsPanelListRouteSchema } from "../../../models/transportModels/v1/gtfsPanelListRouteSchema"
import { GtfsStopSchema } from "../../../models/transportModels/v1/gtfsStopSchema"
import { TranslinkShapeSchema } from "../../../models/transportModels/v1/translinkShapeSchema"
import { TranslinkStopSchema } from "../../../models/transportModels/v1/translinkStopSchema"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/gtfsTransport/
// -------------------------------------------------------
export const transportIndex = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsRoutes
// -------------------------------------------------------
export const getAllGtfsRoutes = async (req, res) => {
  GtfsRouteSchema.find({})
    .then((gtfsRouteSchema) => res.json(gtfsRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Panel List Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsPanelListRoutes
// -------------------------------------------------------
export const getAllPanelListGtfsRoutes = async (req, res) => {
  GtfsPanelListRouteSchema.find({})
    .then((gtfsPanelListRouteSchema) => res.json(gtfsPanelListRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Panel List Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsPanelListRoutes
// -------------------------------------------------------
export const putOnePanelListGtfsRoutes = async (req, res) => {
  const filter = { routeNumber: req.body.routeNumber }
  const update = { routeVisible: req.body.routeVisible }

  GtfsPanelListRouteSchema.findOneAndUpdate(filter, update)
    .then((gtfsPanelListRouteSchema) => res.json(gtfsPanelListRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Bus Stops
// Path: localhost:5000/api/gtfsTransport/gtfsStops
// -------------------------------------------------------
export const getAllGtfsStops = async (req, res) => {
  GtfsStopSchema.find({})
    .then((gtfsStopSchema) => res.json(gtfsStopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Bus Routes
// Path: localhost:5000/api/translinkTransport/translinkShapes
// -------------------------------------------------------
const Keys = ["7", "8", "9"]

export const getAllTranslinkShapes = async (req, res) => {
  TranslinkShapeSchema.find({ shapeKey: Keys }) // 3 = Train, 1&2 = Route Endpoints
    .then((translinkShapeSchema) => res.json(translinkShapeSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Bus Stops
// Path: localhost:5000/api/translinkTransport/translinkStops
// -------------------------------------------------------
export const getAllTranslinkStops = async (req, res) => {
  TranslinkStopSchema.find({})
    .then((translinkStopSchema) => res.json(translinkStopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}
