import { HomeTemperatureSchema } from "../../../models/weatherModels/v1/rtTemperatureSchema"
import { CoordsSchema } from "../../../models/commonModels/v1/coordsSchema"

// Path localhost:5000/api/weather/
export function weatherIndex(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/api/weather/homeWeather
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

  const homeTemperature = new HomeTemperatureSchema({
    databaseVersion: req.body.databaseVersion,
    timeOfMeasurement: req.body.databaseVersion,
    locationName: location,
    locationCoordinates: location_coords,
    locationTemperature: req.body.locationTemperature,
  })

  // Save the temperature in the database
  homeTemperature
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

// Path localhost:5000/api/weather/homeWeather
export function findAll(req, res) {
  HomeTemperatureSchema.find({})
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

// Path localhost:5000/api/weather/homeWeather/:id
export function findOne(req, res) {
  const id = req.params.id

  HomeTemperatureSchema.findById(id)
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
