// import { TemperatureSchema } from "../../../models/weatherModels/v1/temperatureSchema"
import { CoordsSchema } from "../../../models/commonModels/v1/coordsSchema"

// Path localhost:5000/api/weather/
export function transportIndex(req, res) {
  res.send({ response: "I am alive" }).status(200)
}
