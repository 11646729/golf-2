import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const rtTemperatureSchema = new Schema(
  {
    databaseVersion: { type: Number, default: 1.0 },
    timeOfMeasurement: {
      type: String,
    },
    locationName: { type: String },
    locationCoordinates: { type: CoordsSchema.schema },
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
