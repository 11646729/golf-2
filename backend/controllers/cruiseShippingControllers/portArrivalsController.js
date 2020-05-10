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
  const database_version = req.body.databaseVersion
  const port_name = req.body.portName
  const port_un_locode = req.body.portUnLocode
  const port_coordinates = req.body.portCoordinates
  const vessel_short_cruise_name = req.body.vesselShortCruiseName
  const vessel_eta = req.body.vesselEta
  const vessel_etd = req.body.vesselEtd
  const vessel_name_url = req.body.vesselNameUrl

  const portArrival = new PortArrivalSchema({
    databaseVersion: database_version,
    portName: port_name,
    portUnLocode: port_un_locode,
    portCoordinates: port_coordinates,
    vesselShortCruiseName: vessel_short_cruise_name,
    vesselEta: vessel_eta,
    vesselEtd: vessel_etd,
    vesselNameUrl: vessel_name_url,
  })

  portArrival
    .save()
    .then(() => res.json("Port Arrival added!"))
    .catch((err) => res.status(400).json("Error: " + err))
}
