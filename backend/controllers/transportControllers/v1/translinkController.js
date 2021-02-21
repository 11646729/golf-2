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
// Path: localhost:5000/api/translinkTransport/createTranslinkShapes
// -------------------------------------------------------
export const createTranslinkShapes = async (req, res) => {
  const rawGeojson = "./rawData/translink_ulsterbus_routes.json"

  fs.readFile(rawGeojson, "utf8", (err, data) => {
    if (err) {
      throw err
    }

    res.send(JSON.parse(data))
  })
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
// Path: localhost:5000/api/translinkTransport/createTranslinkStops
// -------------------------------------------------------
export const createTranslinkStops = async (req, res) => {
  const rawGeojson = "./rawData/translink_bus_stop_list_january_2018.json"

  fs.readFile(rawGeojson, "utf8", (err, data) => {
    if (err) {
      throw err
    }

    res.send(JSON.parse(data))
  })
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
