import { GtfsStopSchema } from "../../../models/transportModels/v1/gtfsStopSchema"
import { GtfsReducedShapesSchema } from "../../../models/transportModels/v1/gtfsReducedShapesSchema"

// Path localhost:5000/api/gtfsTransport/
export const gtfsTransportIndex = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/api/gtfsTransport/stops
export const gtfsGetAllStops = async (req, res) => {
  GtfsStopSchema.find({})
    .then((gtfsStopSchema) => res.json(gtfsStopSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/gtfsTransport/stops/:id
export const gtfsGetOneStop = async (req, res) => {
  const id = req.params.id

  GtfsStopSchema.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found gtfsTransport stop with id " + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving gtfsTransport stop with id= " + id,
      })
    })
}

// Path localhost:5000/api/gtfsTransport/shapes
export const gtfsGetAllReducedShapes = async (req, res) => {
  GtfsReducedShapesSchema.find({ shapeId: "25774" })
    // GtfsReducedShapesSchema.find({})
    .then((gtfsReducedShapesSchema) => res.json(gtfsReducedShapesSchema))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/gtfsTransport/shapes/:id
export const gtfsGetOneReducedShape = async (req, res) => {
  const id = req.params.id

  GtfsReducedShapesSchema.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found gtfsTransport shape with id " + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error retrieving gtfsTransport shape with id= " + id,
      })
    })
}

// Path localhost:5000/api/gtfsTransport/route
export const gtfsGetRoute = async (req, res) => {
  console.log("In gtfsGetRoute in gtfsTransportController")

  // GtfsReducedShapesSchema.find({ shapeId: "25774" })
  //   // GtfsReducedShapesSchema.find({})
  //   .then((gtfsReducedShapesSchema) => res.json(gtfsReducedShapesSchema))
  //   .catch((err) => res.status(400).json("Error " + err))
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
  GtfsStopSchema.deleteMany({}, (err) => {
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
