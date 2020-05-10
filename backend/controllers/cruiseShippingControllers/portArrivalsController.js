import { PortArrival } from "../../models/cruiseShippingModels/v1/portArrivalSchema"

// Path localhost:3000/cruiseShips/
export function index_get(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:3000/cruiseShips/portArrivals
export function port_arrivals_get(req, res) {
  PortArrival.find({})
    .then((portArrival) => res.json(portArrival))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:3000/cruiseShips/portArrivals/add
export function port_arrivals_add(req, res) {
  const newPortArrival = new PortArrival({
    databaseVersion: req.body.database_version,
    portName: req.body.port_name,
    portUnLocode: req.body.port_un_locode,
    portCoordinates: req.body.port_coords,
    vesselShortcruiseName: req.body.vessel_shortcruise_name,
    vesselEta: req.body.vessel_eta,
    vesselEtd: req.body.vessel_etd,
    vesselNameUrl: req.body.vessel_name_url,
  })

  newPortArrival
    .save()
    .then(() => res.json("Arrival added!"))
    .catch((err) => res.status(400).json("Error: " + err))
}
