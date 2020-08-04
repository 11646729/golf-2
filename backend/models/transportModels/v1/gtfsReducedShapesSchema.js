import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const gtfsReducedShapesSchema = new Schema(
  {
    databaseVersion: { type: Number },
    agencyKey: { type: String },
    shapeId: { type: String },
    shapeCoordinates: [{ type: CoordsSchema.schema }],
    tripId: { type: String },
    busStopsId: { type: String },
    busStopsCoordinates: { type: String },
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
