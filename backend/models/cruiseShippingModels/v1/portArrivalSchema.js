import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/coordsSchema"

const portArrivalSchema = new Schema(
  {
    databaseVersion: { type: Number, default: 1.0 },
    portName: { type: String },
    portUnLocode: { type: String },
    portCoordinates: { type: CoordsSchema.schema },
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
