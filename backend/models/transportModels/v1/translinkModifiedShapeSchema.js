import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const translinkModifiedShapeSchema = new Schema(
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
    from_stop_id: {
      type: Number,
    },
    to_stop_id: {
      type: Number,
    },
    // shape_pt_lat: {
    //   type: Number,
    //   required: true,
    //   min: -90,
    //   max: 90,
    // },
    // shape_pt_lon: {
    //   type: Number,
    //   required: true,
    //   min: -180,
    //   max: 180,
    // },
    shapeCoordinates: [{ type: CoordsSchema.schema }],
    // loc: {
    //   type: [Number],
    //   index: "2dsphere",
    // },
    // shape_pt_sequence: {
    //   type: Number,
    //   required: true,
    // },
    // shape_dist_traveled: {
    //   type: Number,
    // },
    shape_duplicate: {
      type: String,
    },
    to_from_shape: {
      type: String,
    },
    from_to_shape: {
      type: String,
    },
  },
  {
    timestamps: false,
  }
)

translinkModifiedShapeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const TranslinkModifiedShapeSchema = mongoose.model(
  "translinkmodifiedshapes",
  translinkModifiedShapeSchema
)
