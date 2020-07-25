import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const stopsSchema = new Schema(
  {
    databaseVersion: Number,
    agency_key: String,
    stop_id: Number,
    stop_code: String,
    stop_name: String,
    stop_desc: String,
    stop_coordinates: CoordsSchema.schema,
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

stopsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const StopsSchema = mongoose.model("translink_stops", stopsSchema)
