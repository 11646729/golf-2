import { PortArrivalSchema } from "../../../models/cruiseModels/v1/portArrivalSchema"
import { CoordsSchema } from "../../../models/commonModels/v1/coordsSchema"

// Path localhost:5000/api/cruise/
export function cruiseIndex(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/api/cruise/portArrivals
export function findAll(req, res) {
  PortArrivalSchema.find({})
    .then((portArrival) => res.json(portArrival))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/cruise/portArrivals/:id
export function findOne(req, res) {}

// Path localhost:5000/api/cruise/portArrivals/add
export function create(req, res) {
  const location = new CoordsSchema({
    lat: req.body.port_coordinates_lat,
    lng: req.body.port_coordinates_lng,
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

  portArrival
    .save()
    .then(() => res.json("Port Arrival added!"))
    .catch((err) => res.status(400).json("Error: " + err))
}
