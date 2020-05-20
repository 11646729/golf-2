import { HomeTemperatureSchema } from "../../models/weatherModels/v1/rtTemperatureSchema"

// Path localhost:5000/weather/
export function index_get(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/weather/homeWeather
export function home_weather_get(req, res) {
  HomeTemperatureSchema.find({})
    .then((rtTemperature) => res.json(rtTemperature))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:5000/weather/homeWeather/add
export function home_weather_add(req, res) {
  const database_version = req.body.databaseVersion
  const time_of_measurement = req.body.timeOfMeasurement
  const location_name = req.body.locationName
  const location_coords = req.body.locationCoords
  const location_temperature = req.body.locationTemperature

  const homeTemperature = new HomeTemperatureSchema({
    databaseVersion: database_version,
    timeOfMeasurement: time_of_measurement,
    locationName: location_name,
    locationCoordinates: location_coords,
    locationTemperature: location_temperature,
  })

  homeTemperature
    .save()
    .then(() => res.json("Temperature Measurement added!"))
    .catch((err) => res.status(400).json("Error: " + err))
}
