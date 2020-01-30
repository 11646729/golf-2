import { PortArrival } from "../../models/cruiseShippingModels/v1/portArrival"

// Path localhost:3000/cruiseShips/
export function index_get(req, res, next) {
  res.send("NOT IMPLEMENTED: root path in the portArrivalsController path")
}

// Path localhost:3000/cruiseShips/portArrivals
export function port_arrivals_get(req, res) {
  PortArrival.find()
    .then(portArrival => res.json(portArrival))
    .catch(err => res.status(400).json("Error " + err))
}

// Path localhost:3000/cruiseShips/portArrivals/add
export function port_arrivals_add(req, res) {
  const database_version = req.body.database_version
  const port_name = req.body.port_name
  const port_un_locode = req.body.port_un_locode
  const port_longitude = req.body.port_longitude
  const port_latitude = req.body.port_latitude
  const vessel_shortcruise_name = req.body.vessel_shortcruise_name
  const vessel_eta = req.body.vessel_eta
  const vessel_etd = req.body.vessel_etd
  const vessel_name_url = req.body.vessel_name_url

  //  { type: "Point", coordinates: [ 40, 5 ] }

  const newPortArrival = new PortArrival({
    database_version,
    port_name,
    port_un_locode,
    port_longitude,
    port_latitude,
    vessel_shortcruise_name,
    vessel_eta,
    vessel_etd,
    vessel_name_url
  })

  newPortArrival
    .save()
    .then(() => res.json("Arrival added!"))
    .catch(err => res.status(400).json("Error: " + err))
}
