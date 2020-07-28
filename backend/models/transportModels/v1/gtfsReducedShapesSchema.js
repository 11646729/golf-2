import mongoose, { Schema } from "mongoose"
import { GtfsCoordsSchema } from "../../commonModels/v1/gtfsCoordsSchema"

const gtfsReducedShapesSchema = new Schema(
  {
    databaseVersion: { type: Number },
    agencyKey: { type: String },
    shapeId: { type: String },
    coordinates: [{ type: GtfsCoordsSchema.schema }],
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
