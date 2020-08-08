import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const translinkStopSchema = new Schema(
  {
    databaseVersion: { type: Number },
    agency_key: { type: String },
    stop_id: { type: Number },
    stop_code: { type: String },
    stop_name: { type: String },
    stop_desc: { type: String },
    stop_coordinates: { type: CoordsSchema.schema },
    zone_id: { type: String },
    stop_url: { type: String },
    location_type: { type: Number },
    parent_station: { type: String },
    stop_timezone: { type: String },
    wheelchair_boarding: { type: Number },
  },
  {
    timestamps: true,
  }
)

translinkStopSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const TranslinkStopSchema = mongoose.model(
  "translinkstops",
  translinkStopSchema
)
