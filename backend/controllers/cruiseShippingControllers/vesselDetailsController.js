import { VesselDetailsSchema } from "../../models/cruiseShippingModels/v1/vesselDetailsSchema"

// Path localhost:3000/cruiseShips/vessels
export function vessel_get(req, res) {
  VesselDetailsSchema.find()
    .then((vessel) => res.json(vessel))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:3000/cruiseShips/vessels/add
export function vessel_add(req, res) {
  const database_version = req.body.databaseVersion
  const vessel_name_url = req.body.vessel_name_url
  const title_temp = req.body.title
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

  const newVessel = new VesselDetailsSchema({
    databaseVersion: database_version,
    vesselNameUrl: vessel_name_url,
    title: title_temp,
    vesselType: vessel_type,
    vesselName: vessel_name,
    vesselFlag: vessel_flag,
    vesselShortOperator: vessel_short_operator,
    vesselLongOperator: vessel_long_operator,
    vesselYearBuilt: vessel_year_built,
    vesselLengthMetres: vessel_length_metres,
    vesselWidthMetres: vessel_width_metres,
    vesselGrossTonnage: vessel_gross_tonnage,
    vesselAverageSpeedKnots: vessel_average_speed_knots,
    vesselMaxSpeedKnots: vessel_max_speed_knots,
    vesselAverageDraughtMetres: vessel_average_draught_metres,
    vesselImoNumber: vessel_imo_number,
    vesselMmsiNumber: vessel_mmsi_number,
    vesselCallsign: vessel_callsign,
    vesselTypicalPassengers: vessel_typical_passengers,
    vesselTypicalCrew: vessel_typical_crew,
  })

  newVessel
    .save()
    .then(() => res.json("Vessel added!"))
    .catch((err) => res.status(400).json("Error: " + err))
}
