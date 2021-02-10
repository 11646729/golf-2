import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const translinkStopSchema = new Schema(
  {
    databaseVersion: { type: Number },
    agencyName: { type: String },
    markerType: { type: String },
    stop_id: {
      type: String,
      required: true,
      index: true,
    },
    stop_code: {
      type: String,
      index: true,
    },
    stop_name: {
      type: String,
      required: true,
    },
    stopCoordinates: { type: CoordsSchema.schema },
    stop_desc: { type: String },
    loc: {
      type: [Number],
      index: "2dsphere",
    },
    zone_id: { type: String },
    stop_url: { type: String },
    location_type: {
      type: Number,
      min: 0,
      max: 1,
    },
    parent_station: { type: String },
    stop_timezone: { type: String },
    wheelchair_boarding: {
      type: Number,
      min: 0,
      max: 2,
    },
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
