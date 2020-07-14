import mongoose, { Schema } from "mongoose"
import { GtfsCoordsSchema } from "../../commonModels/v1/gtfsCoordsSchema"

const stopsStationsSchema = new Schema(
  {
    databaseVersion: Number,
    stop_id: Number,
    stop_code: String,
    stop_name: String,
    stop_desc: String,
    stop_coordinates: GtfsCoordsSchema.schema,
    zone_id: String,
    stop_url: String,
    location_type: Number,
    parent_station: String,
    stop_timezone: String,
    wheelchair_boarding: Number,
  },
  {
    timestamps: true,
  }
)

stopsStationsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const StopsStationsSchema = mongoose.model(
  "stopsStations",
  stopsStationsSchema
)
