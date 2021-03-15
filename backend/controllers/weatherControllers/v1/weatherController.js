import { TemperatureSchema } from "../../../models/weatherModels/v1/temperatureSchema"
import { CoordsSchema } from "../../../models/commonModels/v1/coordsSchema"

// Path localhost:5000/api/weather/
export function weatherIndex(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/api/weather/temperatures
export function findAll(req, res) {
  TemperatureSchema.find({})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error ocurred while retrieving temperature.",
      })
    })
}

// Path localhost:5000/api/weather/temperatures/:id
export function findOne(req, res) {
  const id = req.params.id

  TemperatureSchema.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found temperature with id " + id })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error retrieving temperature with id= " + id,
      })
    })
}

// Path localhost:5000/api/weather/temperatures
export function create(req, res) {
  // Validate request
  if (!req.body.location_lat || !req.body.location_lng) {
    res.status(400).send({ message: "Coordinates cannot be empty!" })
    return
  }
  // Create a new location object
  const location = new CoordsSchema({
    lat: req.body.location_lat,
    lng: req.body.location_lng,
  })

  const temperature = new TemperatureSchema({
    databaseVersion: req.body.databaseVersion,
    timeOfMeasurement: req.body.databaseVersion,
    locationName: location,
    locationCoordinates: location_coords,
    locationTemperature: req.body.locationTemperature,
  })

  // Save the temperature in the database
  temperature
    .save()
    .then((data) => {
      res.send(data)
    })
    .catch((err) =>
      res.status(500).send({
        message:
          err.message ||
          "Some error ocurred while creating the new temperature.",
      })
    )
}

// Direct call to save a new weather data reading in the database
export const directCreate = (darkSkiesData) => {
  const location_coords = new CoordsSchema({
    lat: darkSkiesData.locationCoordinates.lat,
    lng: darkSkiesData.locationCoordinates.lng,
  })

  const temperature = new TemperatureSchema({
    databaseVersion: darkSkiesData.databaseVersion,
    timeOfMeasurement: darkSkiesData.timeOfMeasurement,
    locationName: darkSkiesData.locationName,
    locationCoordinates: location_coords,
    locationTemperature: darkSkiesData.locationTemperature,
  })

  temperature.save({}, (err) => {
    if (err) {
      console.log(
        "Some error ocurred while creating the new temperature. " + err
      )
    }
  })
}

// Path localhost:5000/api/weather/temperatures/:id
export function updateOne(req, res) {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update cannot be empty!",
    })
  }

  const id = req.params.id

  TemperatureSchema.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message:
            "Cannnot update temperature readings with id=${id}. Maybe temperature readings was not found!",
        })
      else
        res.send({ message: "temperature readings was updated successfully." })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Error updating temperature readings with id= " + id,
      })
    })
}

// Path localhost:5000/api/weather/temperatures
export const deleteAll = async (req, res) => {
  await TemperatureSchema.deleteMany({})
    .then((data) => {
      res.send({
        message:
          "${data.deletedCount} temperature readings were deleted successfully!",
      })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all temperature readings",
      })
    })
}

// Direct call to delete all weather data in the database
export const directDeleteAll = async (req, res) => {
  await TemperatureSchema.deleteMany({})
    .then((data) => {
      res.send({
        message:
          "${data.deletedCount} temperature readings were deleted successfully!",
      })
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all temperature readings",
      })
    })
}

// Path localhost:5000/api/weather/temperatures/:id
export function deleteOne(req, res) {
  const id = req.params.id

  TemperatureSchema.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message:
            "Cannot delete temperature reading with id=${id}. Maybe temperature reading was not found!",
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete temperature reading with id=" + id,
      })
    })
}
