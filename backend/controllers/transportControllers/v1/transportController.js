import { GtfsStopsSchema } from "../../../models/transportModels/v1/gtfsStopsSchema"
import { GtfsCoordsSchema } from "../../../models/commonModels/v1/gtfsCoordsSchema"

// Path localhost:5000/api/transport/
export const transportIndex = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/api/transport/stops
export const getAllStops = async (req, res) => {
  GtfsStopsSchema.find({})
    .then((gtfsStopsSchema) => res.json(gtfsStopsSchema))
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

// Direct call to delete all bus stops in the database
export const directDeleteAll = async () => {
  GtfsStopsSchema.deleteMany({}, (err) => {
    if (err) {
      console.log("Some error occurred while removing all bus stops")
    } else {
      console.log("All bus stops were deleted successfully!")
    }
  })
}
