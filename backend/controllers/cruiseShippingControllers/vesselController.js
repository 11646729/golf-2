import { VesselDetails } from "../../models/cruiseShippingModels/v1/vesselDetails"

// Path localhost:3000/cruiseShips/vessels
export function vessel_get(req, res) {
  VesselDetails.find()
    .then(vessel => res.json(vessel))
    .catch(err => res.status(400).json("Error " + err))
}

// Path localhost:3000/cruiseShips/vessels/add
export function vessel_add(req, res) {
  const database_version = req.body.databaseVersion
  const vessel_name_url = req.body.vessel_name_url
  const title = req.body.title
  const vessel_type = req.body.vessel_type
  const vessel_name = req.body.vessel_name
  const vessel_flag = req.body.vessel_flag
  const vessel_short_operator = req.body.vessel_short_operator
  const vessel_long_operator = req.body.vessel_long_operator
  const vessel_year_built = req.body.vessel_year_built
  const vessel_length_metres = req.body.vessel_length_metres
  const vessel_width_metres = req.body.vessel_width_metres
  const vessel_gross_tonnage = req.body.vessel_gross_tonnage
  const vessel_average_speed_knots = req.body.vessel_average_speed_knots
  const vessel_max_speed_knots = req.body.vessel_max_speed_knots
  const vessel_average_draught_metres = req.body.vessel_average_draught_metres
  const vessel_imo_number = req.body.vessel_imo_number
  const vessel_mmsi_number = req.body.vessel_mmsi_number
  const vessel_callsign = req.body.vessel_callsign
  const vessel_typical_passengers = req.body.vessel_typical_passengers
  const vessel_typical_crew = req.body.vessel_typical_crew

  const newVessel = new Vessel({
    database_version,
    vessel_name_url,
    title,
    vessel_type,
    vessel_name,
    vessel_flag,
    vessel_short_operator,
    vessel_long_operator,
    vessel_year_built,
    vessel_length_metres,
    vessel_width_metres,
    vessel_gross_tonnage,
    vessel_average_speed_knots,
    vessel_max_speed_knots,
    vessel_average_draught_metres,
    vessel_imo_number,
    vessel_mmsi_number,
    vessel_callsign,
    vessel_typical_passengers,
    vessel_typical_crew
  })

  newVessel
    .save()
    .then(() => res.json("Vessel added!"))
    .catch(err => res.status(400).json("Error: " + err))
}
