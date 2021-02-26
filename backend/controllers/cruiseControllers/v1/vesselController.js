import { VesselSchema } from "../../../models/cruiseModels/v1/vesselSchema"

// Path localhost:5000/api/cruise/vessel
export function findAll(req, res) {
  VesselSchema.find({})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error ocurred while retrieving vessel",
      })
    })
}

// Path localhost:5000/api/cruise/vessel/:id
export function findOne(req, res) {
  const id = req.params.id

  VesselSchema.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found vessel with id " + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving vessel with id= " + id,
      })
    })
}

// Path localhost:5000/api/cruise/vessel
export function create(req, res) {
  // Validate request
  if (!req.body.location_lat || !req.body.location_lng) {
    res.status(400).send({ message: "Coordinates cannot be empty!" })
    return
  }

  const vessel = new VesselSchema({
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

  // Save the vessel in the database
  vessel
    .save()
    .then((data) => {
      res.send(data)
    })
    .catch((err) =>
      res.status(500).send({
        message:
          err.message || "Some error ocurred while creating the new vessel",
      })
    )
}

// Path localhost:5000/api/cruise/vessel/:id
export function updateOne(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    })
  }

  const id = req.params.id

  VesselSchema.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message:
            "Cannnot update vessel with id=${id}. Maybe vessel was not found!",
        })
      else res.send({ message: "Vessel was updated successfully." })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating vessel with id= " + id,
      })
    })
}

// Path localhost:5000/api/cruise/vessel/:id
export function deleteOneVessel(req, res) {
  const id = req.params.id

  VesselSchema.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete vesselSchema with id=${id}. Maybe vesselSchema was not found!",
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete vesselSchema with id=" + id,
      })
    })
}

// Delete all Vessels in the database
export function deleteAllVessels() {
  VesselSchema.deleteMany({}).then((res) => {
    console.log("No of old Vessels deleted: ", res.deletedCount)
    // .catch((err) => {
    //   console.log(err.message)
    // })
  })
}
