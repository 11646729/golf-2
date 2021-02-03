import { TranslinkStopSchema } from "../../../models/transportModels/v1/translinkStopSchema"
import { TranslinkModifiedShapeSchema } from "../../../models/transportModels/v1/translinkModifiedShapeSchema"

// -------------------------------------------------------
// Catalogue home page
// Path: localhost:5000/api/transport/
// -------------------------------------------------------
export const transportIndex = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Stops
// Path: localhost:5000/api/transport/stops
// -------------------------------------------------------
export const getAllStops = async (req, res) => {
  TranslinkStopSchema.find({})
    .then((stopsSchema) => res.json(stopsSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// -------------------------------------------------------
// Stops
// Path: localhost:5000/api/transport/shapes
// -------------------------------------------------------
export const getAllModifiedShapes = async (req, res) => {
  // TranslinkModifiedShapeSchema.find({ shapeId: "25774" })
  TranslinkModifiedShapeSchema.find({})
    .then((TranslinkModifiedShapeSchema) =>
      res.json(TranslinkModifiedShapeSchema)
    )
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/transport/stopsstations
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
// Path: localhost:5000/api/transport/stops
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
