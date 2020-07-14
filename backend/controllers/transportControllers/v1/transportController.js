import { StopsStationsSchema } from "../../../models/transportModels/v1/stopsStationsSchema"
import { GtfsCoordsSchema } from "../../../models/commonModels/v1/gtfsCoordsSchema"

// Path localhost:5000/api/transport/
export function transportIndex(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// Path localhost:5000/api/transport/stopsstations
export function stops_and_stations_getAll(req, res) {
  StopsStationsSchema.find({})
    .then((stopsStationsSchema) => res.json(stopsStationsSchema))
    .catch((err) => res.status(400).json("Error " + err))
}
