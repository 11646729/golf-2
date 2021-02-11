const fs = require("fs")
import { TranslinkStopSchema } from "../../../models/transportModels/v1/translinkStopSchema"
import { TranslinkShapeSchema } from "../../../models/transportModels/v1/translinkShapeSchema"

// -------------------------------------------------------
// Catalogue home page
// Path: localhost:5000/api/translinkTransport/
// -------------------------------------------------------
export const transportIndex = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Bus Routes
// Path: localhost:5000/api/translinkTransport/translinkRoutes
// -------------------------------------------------------
export const getAllTranslinkRoutes = async (req, res) => {
  TranslinkShapeSchema.find({ shapeId: "25774" })
    // TranslinkShapeSchema.find({})
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

// -------------------------------------------------------
// Bus Stops
// Path: localhost:5000/api/translinkTransport/translinkStops
// -------------------------------------------------------
export const deleteAllStops = async (req, res) => {
  TranslinkStopSchema.deleteMany({}, (err) => {
    if (err) {
      res
        .status(500)
        .send("An unspecified error occurred while removing all Stops!")
    } else {
      res.status(200).send("All Stops were deleted in the mongodb database")
    }
  })
}
