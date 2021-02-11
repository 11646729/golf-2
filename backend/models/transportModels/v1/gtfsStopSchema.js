import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const gtfsStopSchema = new Schema(
  {
    databaseVersion: { type: Number },
    agencyName: { type: String },
    markerType: { type: String },
    stopKey: { type: String },
    stopCode: { type: Number },
    stopID: { type: Number },
    stopColor: { type: String },
    stopName: { type: String },
    stopCoordinates: { type: CoordsSchema.schema },
  },
  {
    timestamps: true,
  }
)

gtfsStopSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const GtfsStopSchema = mongoose.model("gtfsStops", gtfsStopSchema)
