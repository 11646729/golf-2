import mongoose, { Schema } from "mongoose"

const locationSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
})

const PortArrivalSchema = new Schema(
  {
    databaseVersion: { type: Number, default: 1.0 },
    portName: { type: String },
    portUnLocode: { type: String },
    portCoordinates: { type: locationSchema },
    vesselShortcruiseName: { type: String },
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
export const PortArrival = mongoose.model("portArrival", PortArrivalSchema)
