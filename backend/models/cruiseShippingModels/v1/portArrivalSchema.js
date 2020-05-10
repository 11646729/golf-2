import mongoose, { Schema } from "mongoose"
import { LocationSchema } from "../../commonModels/locationSchema"

const portArrivalSchema = new Schema(
  {
    databaseVersion: { type: Number, default: 1.0 },
    portName: { type: String },
    portUnLocode: { type: String },
    portCoordinates: { type: LocationSchema.schema },
    vesselShortCruiseName: { type: String },
    vesselEta: { type: String },
    vesselEtd: { type: String },
    vesselNameUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

// Export model
export const PortArrivalSchema = mongoose.model(
  "portArrival",
  portArrivalSchema
)
