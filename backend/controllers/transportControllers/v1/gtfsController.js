import { GtfsRouteSchema } from "../../../models/transportModels/v1/gtfsRouteSchema"
import { GtfsPanelListRouteSchema } from "../../../models/transportModels/v1/gtfsPanelListRouteSchema"
import { GtfsStopSchema } from "../../../models/transportModels/v1/gtfsStopSchema"

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
export const getAllRoutes = async (req, res) => {
  GtfsRouteSchema.find({})
    .then((gtfsRouteSchema) => res.json(gtfsRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Panel List Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsPanelListRoutes
// -------------------------------------------------------
export const getAllPanelListRoutes = async (req, res) => {
  GtfsPanelListRouteSchema.find({})
    .then((gtfsPanelListRouteSchema) => res.json(gtfsPanelListRouteSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Panel List Bus Routes
// Path: localhost:5000/api/gtfsTransport/gtfsPanelListRoutes
// -------------------------------------------------------
export const putOnePanelListRoutes = async (req, res) => {
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
export const getAllStops = async (req, res) => {
  GtfsStopSchema.find({})
    .then((gtfsStopSchema) => res.json(gtfsStopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}
