import mongoose, { Schema } from "mongoose"
import { LocationSchema } from "../../commonModels/locationSchema"

const rtTemperatureSchema = new Schema(
  {
    database_version: { type: Number, default: 1.0 },
    time_of_measurement: {
      type: String,
    },
    location_name: { type: String },
    location_coords: { type: LocationSchema.schema },
    location_temperature: { type: Number },
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
