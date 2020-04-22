import mongoose, { Schema } from "mongoose"

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
})

const rtTemperatureSchema = new Schema(
  {
    database_version: { type: Number, default: 1.0 },
    time_of_measurement: {
      type: String,
    },
    location_name: { type: String },
    location_coords: { type: GeoSchema },
    location_temperature: { type: Number },
  },
  {
    timestamps: true,
  }
)

// Export model
export const HomeTemperature = mongoose.model(
  "rtTemperature",
  rtTemperatureSchema
)
