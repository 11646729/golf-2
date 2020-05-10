import { PortArrivalSchema } from "../../models/cruiseShippingModels/v1/portArrivalSchema"

// Path localhost:3000/cruiseShips/
export function index_get(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:3000/cruiseShips/portArrivals
export function port_arrivals_get(req, res) {
  PortArrivalSchema.find({})
    .then((portArrival) => res.json(portArrival))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:3000/cruiseShips/portArrivals/add
export function port_arrivals_add(req, res) {
  const portArrival = new PortArrivalSchema({
    databaseVersion: req.body.databaseVersion,
    portName: req.body.portName,
    portUnLocode: req.body.portUnLocode,
    portCoordinates: req.body.portCoordinates,
    vesselShortcruiseName: req.body.vesselShortcruiseName,
    vesselEta: req.body.vesselEta,
    vesselEtd: req.body.vesselEtd,
    vesselNameUrl: req.body.vesselNameUrl,
  })

  portArrival
    .save()
    .then(() => res.json("Port Arrival added!"))
    .catch((err) => res.status(400).json("Error: " + err))
}
