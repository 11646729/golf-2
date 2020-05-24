import { PortArrivalSchema } from "../../models/cruiseShippingModels/v1/portArrivalSchema"
import { CoordsSchema } from "../../models/commonModels/coordsSchema"

// Path localhost:5000/api/cruiseShips/
export function index_get(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/api/cruiseShips/portArrivals
export function port_arrivals_get(req, res) {
  PortArrivalSchema.find({})
    .then((portArrival) => res.json(portArrival))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/api/cruiseShips/portArrivals/add
export function port_arrivals_add(req, res) {
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
