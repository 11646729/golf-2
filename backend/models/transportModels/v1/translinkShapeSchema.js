import mongoose, { Schema } from "mongoose"

const translinkShapeSchema = new Schema(
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
    shape_id: {
      type: String,
      required: true,
      index: true,
    },
    shape_pt_lat: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    shape_pt_lon: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    loc: {
      type: [Number],
      index: "2dsphere",
    },
    shape_pt_sequence: {
      type: Number,
      required: true,
    },
    shape_dist_traveled: Number,
  },
  {
    timestamps: false,
  }
)

translinkShapeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const TranslinkShapeSchema = mongoose.model(
  "translinkshapes",
  translinkShapeSchema
)
