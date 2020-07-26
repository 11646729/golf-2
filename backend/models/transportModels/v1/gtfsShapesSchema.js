import mongoose, { Schema } from "mongoose"

const gtfsShapesSchema = new Schema(
  {
    databaseVersion: Number,
    agency_key: String,
    shape_id: String,
    shape_pt_lat: Number,
    shape_pt_lon: Number,
    shape_pt_sequence: Number,
    shape_distance_travelled: Number,
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
