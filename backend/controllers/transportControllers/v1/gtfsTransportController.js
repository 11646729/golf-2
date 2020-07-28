import { GtfsStopsSchema } from "../../../models/transportModels/v1/gtfsStopsSchema"
import { GtfsReducedShapesSchema } from "../../../models/transportModels/v1/gtfsReducedShapesSchema"
// import { GtfsCoordsSchema } from "../../../models/commonModels/v1/gtfsCoordsSchema"

// Path localhost:5000/api/gtfsTransport/
export const gtfsTransportIndex = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/api/gtfsTransport/stops
export const gftsGetAllStops = async (req, res) => {
  GtfsStopsSchema.find({})
    .then((gtfsStopsSchema) => res.json(gtfsStopsSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/gtfsTransport/shapes
export const gftsGetAllShapes = async (req, res) => {
  GtfsReducedShapesSchema.find({})
    .then((gtfsReducedShapesSchema) => res.json(gtfsReducedShapesSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/gtfsTransport/stopsstations
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

// Direct call to delete all bus stops in the database
export const directDeleteAllStops = async () => {
  GtfsStopsSchema.deleteMany({}, (err) => {
    if (err) {
      console.log("Some error occurred while removing all bus stops")
    } else {
      console.log("All bus stops were deleted successfully!")
    }
  })
}

// Direct call to delete all route shapes in the database
export const directDeleteAllShapes = async () => {
  GtfsReducedShapesSchema.deleteMany({}, (err) => {
    if (err) {
      console.log("Some error occurred while removing all route shapes")
    } else {
      console.log("All route shapes were deleted successfully!")
    }
  })
}
