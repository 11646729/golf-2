import mongoose, { Schema } from "mongoose"

const translinkStopSchema = new Schema(
  {
    created_at: {
      type: Date,
      default: Date.now,
      required: true,
    },
    agency_key: {
      type: String,
      required: true,
      index: true,
    },
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
    stop_desc: String,
    stop_lat: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    stop_lon: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    loc: {
      type: [Number],
      index: "2dsphere",
    },
    zone_id: String,
    stop_url: String,
    location_type: {
      type: Number,
      min: 0,
      max: 1,
    },
    parent_station: String,
    stop_timezone: String,
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