import mongoose, { Schema } from "mongoose"

const gtfsShapesSchema = new Schema(
  {
    databaseVersion: { type: Number },
    agency_key: { type: String },
    shape_id: { type: String },
    shape_pt_lat: { type: Number },
    shape_pt_lon: { type: Number },
    shape_pt_sequence: { type: Number },
    shape_distance_travelled: { type: Number },
  },
  {
    timestamps: true,
  }
)

gtfsShapesSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const GtfsShapesSchema = mongoose.model("shapes", gtfsShapesSchema)
