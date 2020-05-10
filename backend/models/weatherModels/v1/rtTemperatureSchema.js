import mongoose, { Schema } from "mongoose"
import { LocationSchema } from "../../commonModels/locationSchema"

const rtTemperatureSchema = new Schema(
  {
    databaseVersion: { type: Number, default: 1.0 },
    timeOfMeasurement: {
      type: String,
    },
    locationName: { type: String },
    locationCoordinates: { type: LocationSchema.schema },
    locationTemperature: { type: Number },
  },
  {
    timestamps: true,
  }
)

// Export model
export const HomeTemperatureSchema = mongoose.model(
  "rtTemperature",
  rtTemperatureSchema
)
