import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const gtfsReducedStopSchema = new Schema(
  {
    databaseVersion: { type: Number },
    markerType: { type: String },
    shapeKey: { type: String },
    stopCode: { type: Number },
    stopID: { type: Number },
    stopColor: { type: String },
    stopName: { type: String },
    shapeCoordinates: { type: CoordsSchema.schema },
  },
  {
    timestamps: true,
  }
)

gtfsReducedStopSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const GtfsReducedStopSchema = mongoose.model(
  "reducedStops",
  gtfsReducedStopSchema
)
