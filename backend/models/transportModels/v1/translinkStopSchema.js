import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const translinkStopSchema = new Schema(
  {
    databaseVersion: { type: Number },
    agencyName: { type: String },
    markerType: { type: String },
    stopKey: { type: String },
    // stopCode: { type: Number },
    // stopId: { type: Number },
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

translinkStopSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const TranslinkStopSchema = mongoose.model(
  "translinkstops",
  translinkStopSchema
)
