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
// Stops
// Path: localhost:5000/api/Translinktransport/stops
// -------------------------------------------------------
export const getAllStops = async (req, res) => {
  TranslinkStopSchema.find({})
    .then((stopsSchema) => res.json(stopsSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Routes
// Path: localhost:5000/api/Translinktransport/rawRoutes
// -------------------------------------------------------
export const getAllRawTranslinkRoutes = async (req, res) => {
  fs.readFile(
    "./rawData/translink_ulsterbus_routes.json",
    "utf8",
    (err, data) => {
      if (err) {
        throw err
      }

      res.send(JSON.parse(data))
    }
  )
}

export const getAllModifiedShapes = async (req, res) => {
  TranslinkShapeSchema.find({ shapeId: "25774" })
    // TranslinkShapeSchema.find({})
    .then((TranslinkShapeSchema) => res.json(TranslinkShapeSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/Translinktransport/stopsstations
// export function deleteAll(res) {
//   StopsStationsSchema.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: "${data.deletedCount} BusStops were deleted successfully!",
//       })
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all BusStops",
//       })
//     })
// }

// -------------------------------------------------------
// Stops
// Path: localhost:5000/api/Translinktransport/stops
// -------------------------------------------------------
// export const directDeleteAll = async () => {
//   TranslinkStopSchema.deleteMany({}, (err) => {
//     if (err) {
//       console.log("Some error occurred while removing all bus stops")
//     } else {
//       console.log("All bus stops were deleted successfully!")
//     }
//   })
// }
