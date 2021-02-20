import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const translinkShapeSchema = new Schema(
  {
    databaseVersion: { type: Number },
    agencyName: { type: String },
    agencyId: { type: String },
    markerType: { type: String },
    shapeKey: {
      type: String,
    },
    from_stop_id: {
      type: Number,
    },
    to_stop_id: {
      type: Number,
    },
    shapeCoordinates: [{ type: CoordsSchema.schema }],
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
    timestamps: true,
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
