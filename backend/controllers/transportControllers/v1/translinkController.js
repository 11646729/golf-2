const fs = require("fs")
import { TranslinkStopSchema } from "../../../models/transportModels/v1/translinkStopSchema"
import { TranslinkShapeSchema } from "../../../models/transportModels/v1/translinkShapeSchema"

// -------------------------------------------------------
// Catalogue home page
// Path: localhost:5000/api/Translinktransport/
// -------------------------------------------------------
export const transportIndex = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Bus Routes
// Path: localhost:5000/api/Translinktransport/translinkRoutes
// -------------------------------------------------------
export const getAllTranslinkRoutes = async (req, res) => {
  TranslinkShapeSchema.find({ shapeId: "25774" })
    // TranslinkShapeSchema.find({})
    .then((TranslinkShapeSchema) => res.json(TranslinkShapeSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Bus Stops
// Path: localhost:5000/api/Translinktransport/translinkStops
// -------------------------------------------------------
export const getAllTranslinkStops = async (req, res) => {
  TranslinkStopSchema.find({})
    .then((stopsSchema) => res.json(stopsSchema))
    .catch((err) => res.status(400).json("Error " + err))
}
