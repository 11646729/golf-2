import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const portArrivalSchema = new Schema(
  {
    databaseVersion: { type: Number },
    portName: { type: String },
    portUnLocode: { type: String },
    portCoordinates: { type: CoordsSchema.schema },
    vesselShortCruiseName: { type: String },
    vesselEta: { type: String },
    vesselEtd: { type: String },
    vesselNameUrl: { type: String },
  },
  {
    timestamps: true,
  }
)

portArrivalSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const PortArrivalSchema = mongoose.model(
  "portArrival",
  portArrivalSchema
)
