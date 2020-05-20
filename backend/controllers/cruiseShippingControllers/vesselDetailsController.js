import { VesselDetailsSchema } from "../../models/cruiseShippingModels/v1/vesselDetailsSchema"

// Path localhost:5000/cruiseShips/vessels
export function vessel_get(req, res) {
  VesselDetailsSchema.find()
    .then((vessel) => res.json(vessel))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/cruiseShips/vessels/add
export function vessel_add(req, res) {
  const newVessel = new VesselDetailsSchema({
    databaseVersion: req.body.databaseVersion,
    vesselNameUrl: req.body.vessel_name_url,
    title: req.body.title,
    vesselType: req.body.vessel_type,
    vesselName: req.body.vessel_name,
    vesselFlag: req.body.vessel_flag,
    vesselShortOperator: req.body.vessel_short_operator,
    vesselLongOperator: req.body.vessel_long_operator,
    vesselYearBuilt: req.body.vessel_year_built,
    vesselLengthMetres: req.body.vessel_length_metres,
    vesselWidthMetres: req.body.vessel_width_metres,
    vesselGrossTonnage: req.body.vessel_gross_tonnage,
    vesselAverageSpeedKnots: req.body.vessel_average_speed_knots,
    vesselMaxSpeedKnots: req.body.vessel_max_speed_knots,
    vesselAverageDraughtMetres: req.body.vessel_average_draught_metres,
    vesselImoNumber: req.body.vessel_imo_number,
    vesselMmsiNumber: req.body.vessel_mmsi_number,
    vesselCallsign: req.body.vessel_callsign,
    vesselTypicalPassengers: req.body.vessel_typical_passengers,
    vesselTypicalCrew: req.body.vessel_typical_crew,
  })

  newVessel
    .save()
    .then(() => res.json("Vessel added!"))
    .catch((err) => res.status(400).json("Error: " + err))
}
