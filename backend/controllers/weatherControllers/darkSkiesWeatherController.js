import { HomeTemperature } from "../../models/weatherModels/v1/rtTemperature"

// Path localhost:3000/weather/
export function index_get(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:3000/homeWeather
export function home_weather_get(req, res) {
  HomeTemperature.find({})
    .then((rtTemperature) => res.json(rtTemperature))
    .catch((err) => res.status(400).json("Error " + err))
}

// Path localhost:3000/homeWeather/add
export function home_weather_add(req, res) {
  const database_version = req.body.database_version

  const time_of_measurement = req.body.time_of_measurement
  const location_name = req.body.location_name
  const location_coords = req.body.location_coords
  const location_temperature = req.body.location_temperature

  const newHomeTemperature = new HomeTemperature({
    database_version,
    time_of_measurement,
    location_name,
    location_coords,
    location_temperature,
  })

  newHomeTemperature
    .save()
    .then(() => res.json("Temperature Measurement added!"))
    .catch((err) => res.status(400).json("Error: " + err))
}
