import { HomeTemperatureSchema } from "../../models/weatherModels/v1/rtTemperatureSchema"
import { CoordsSchema } from "../../models/commonModels/coordsSchema"

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

  homeTemperature
    .save()
    .then(() => res.json("Temperature Measurement added!"))
    .catch((err) => res.status(400).json("Error: " + err))
}
