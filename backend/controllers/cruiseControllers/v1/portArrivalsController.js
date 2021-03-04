import { PortArrivalSchema } from "../../../models/cruiseModels/v1/portArrivalSchema"
import { CoordsSchema } from "../../../models/commonModels/v1/coordsSchema"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/cruise/
// -------------------------------------------------------
export const index = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Port Arrivals
// Path localhost:5000/api/cruise/portArrivals
// -------------------------------------------------------
export function getPortArrivals(req, res) {
  PortArrivalSchema.find({})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while retrieving portArrivals.",
      })
    })
}

// -------------------------------------------------------
// Port Arrivals
// Path localhost:5000/api/cruise/portArrivals/:id
// -------------------------------------------------------
export function getPortArrival(req, res) {
  const id = req.params.id

  PortArrivalSchema.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found portArrivals with id " + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving portArrivals with id= " + id,
      })
    })
}

// -------------------------------------------------------
// Port Arrivals
// Path localhost:5000/api/cruise/portArrivals
// -------------------------------------------------------
export function postPortArrival(req, res) {
  // Validate request
  if (!req.body.location_lat || !req.body.location_lng) {
    res.status(400).send({ message: "Coordinates cannot be empty!" })
    return
  }
  // Create a new location object
  const location = new CoordsSchema({
    lat: req.body.location_lat,
    lng: req.body.location_lng,
  })

  const portArrival = new PortArrivalSchema({
    databaseVersion: req.body.databaseVersion,
    portName: req.body.portName,
    portUnLocode: req.body.portUnLocode,
    portCoordinates: location,
    vesselShortCruiseName: req.body.vesselShortCruiseName,
    vesselEta: req.body.vesselEta,
    vesselEtd: req.body.vesselEtd,
    vesselNameUrl: req.body.vesselNameUrl,
  })

  // Save the new portArrival in the database
  portArrival
    .save()
    .then((data) => {
      res.send(data)
    })
    .catch((err) =>
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while creating the new portArrival.",
      })
    )
}

// -------------------------------------------------------
// Port Arrivals
// Path localhost:5000/api/cruise/portArrivals/:id
// -------------------------------------------------------
export function putPortArrival(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    })
  }

  const id = req.params.id

  PortArrivalSchema.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message:
            "Cannnot update portArrivals with id=${id}. Maybe portArrivals was not found!",
        })
      else res.send({ message: "PortArrivals was updated successfully." })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating portArrivals with id= " + id,
      })
    })
}
