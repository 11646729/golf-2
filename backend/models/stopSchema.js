import mongoose from "mongoose"
const Schema = mongoose.Schema
import { CoordsSchema } from "./coordsSchema.js"

const stopSchema = new Schema(
  {
    databaseVersion: { type: Number },
    stopFileUrl: { type: String },
    stopFilePath: { type: String },
    stopFileName: { type: String },
    agencyName: { type: String },
    agencyId: { type: String },
    markerType: { type: String },
    stopKey: { type: String },
    stopCode: { type: Number },
    stopId: { type: String },
    stopColor: { type: String },
    stopName: { type: String },
    stopCoordinates: { type: CoordsSchema.schema },
    coordsString: { type: String },
    zone_id: { type: String },
    location_type: {
      type: Number,
      min: 0,
      max: 1,
    },
    wheelchair_boarding: {
      type: Number,
      min: 0,
      max: 2,
    },
  },
  {
    timestamps: true,
  }
)

stopSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const StopSchema = mongoose.model("stops", stopSchema)
