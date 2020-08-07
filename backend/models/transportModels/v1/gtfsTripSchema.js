import mongoose, { Schema } from "mongoose"

const gtfsTripSchema = new Schema(
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
    route_id: {
      type: String,
      required: true,
      index: true,
    },
    service_id: {
      type: String,
      required: true,
      index: true,
    },
    trip_id: {
      type: String,
      required: true,
      index: true,
    },
    trip_headsign: String,
    trip_short_name: String,
    direction_id: {
      type: Number,
      index: true,
      min: 0,
      max: 1,
    },
    block_id: String,
    shape_id: String,
    wheelchair_accessible: {
      type: Number,
      min: 0,
      max: 2,
    },
    bikes_allowed: {
      type: Number,
      min: 0,
      max: 2,
    },
  },
  {
    timestamps: true,
  }
)

gtfsTripSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const GtfsTripSchema = mongoose.model("gtfsTrips", gtfsTripSchema)
