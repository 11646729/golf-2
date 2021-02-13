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
// Bus Shapes
// Path: localhost:5000/api/translinkTransport/translinkShapes
// -------------------------------------------------------
export const getAllShapes = async (req, res) => {
  const rawGeojson = "./rawData/translink_ulsterbus_routes.json"

  fs.readFile(rawGeojson, "utf8", (err, data) => {
    if (err) {
      throw err
    }

    res.send(JSON.parse(data))
  })
}

// -------------------------------------------------------
// Bus Shapes
// Path: localhost:5000/api/translinkTransport/translinkShapes
// -------------------------------------------------------
export function deleteAllShapes(req, res) {
  TranslinkShapeSchema.deleteMany({})
    .then((res) => {
      console.log("No of Shapes successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message || "An error occurred while removing all Shapes")
    })
}

// -------------------------------------------------------
// Bus Routes
// Path: localhost:5000/api/translinkTransport/translinkRoutes
// -------------------------------------------------------
export const getAllRoutes = async (req, res) => {
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
export function deleteAllStops(req, res) {
  TranslinkStopSchema.deleteMany({})
    .then((res) => {
      console.log("No of Stops successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message || "An error occurred while removing all Stops")
    })
}
