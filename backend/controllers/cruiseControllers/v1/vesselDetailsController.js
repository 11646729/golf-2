import { VesselDetailsSchema } from "../../../models/cruiseModels/v1/vesselDetailsSchema"

// Path localhost:5000/api/cruise/vesselDetails
export function findAll(req, res) {
  VesselDetailsSchema.find({})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while retrieving vesselDetails.",
      })
    })
}

// Path localhost:5000/api/cruise/vesselDetails/:id
export function findOne(req, res) {
  const id = req.params.id

  VesselDetailsSchema.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found vesselDetails with id " + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving vesselDetails with id= " + id,
      })
    })
}

// Path localhost:5000/api/cruise/vesselDetails
export function create(req, res) {
  // Validate request
  if (!req.body.location_lat || !req.body.location_lng) {
    res.status(400).send({ message: "Coordinates cannot be empty!" })
    return
  }

  const vesselDetails = new VesselDetailsSchema({
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

  // Save the vesselDetails in the database
  vesselDetails
    .save()
    .then((data) => {
      res.send(data)
    })
    .catch((err) =>
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while creating the new vesselDetails.",
      })
    )
}

// Path localhost:5000/api/cruise/vesselDetails/:id
export function updateOne(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    })
  }

  const id = req.params.id

  VesselDetailsSchema.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message:
            "Cannnot update vesselDetails with id=${id}. Maybe vesselDetails was not found!",
        })
      else res.send({ message: "VesselDetails was updated successfully." })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error updating vesselDetails with id= " + id,
      })
    })
}

// Path localhost:5000/api/cruise/vesselDetails
export function deleteAll(req, res) {
  VesselDetailsSchema.deleteMany({})
    .then((data) => {
      res.send({
        message:
          "${data.deletedCount} VesselDetails were deleted successfully!",
      })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all vesselDetails",
      })
    })
}

// Path localhost:5000/api/cruise/vesselDetails/:id
export function deleteOne(req, res) {
  const id = req.params.id

  VesselDetailsSchema.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete vesselDetailsSchema with id=${id}. Maybe vesselDetailsSchema was not found!",
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete vesselDetailsSchema with id=" + id,
      })
    })
}

// Direct call
export function directDeleteAll() {
  VesselDetailsSchema.deleteMany({}, (err) => {
    if (err) {
      console.log("Some error occurred while removing all vessel details")
    } else {
      console.log("All vessel details were deleted successfully!")
    }
  })
}
