import mongoose, { Schema } from "mongoose"

const gtfsReducedShapesSchema = new Schema(
  {
    databaseVersion: Number,
    agency_key: String,
    shape_id: String,
    shape_path: String,
    // shape_pt_lat: Number,
    // shape_pt_lon: Number,
    // shape_pt_sequence: Number,
    // shape_distance_travelled: Number,
  },
  {
    timestamps: true,
  }
)

gtfsReducedShapesSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const GtfsReducedShapesSchema = mongoose.model(
  "reducedShapes",
  gtfsReducedShapesSchema
)
