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

var rtTemperatureSchema = new Schema(
  {
    databaseVersion: { type: Number, default: 1.0 },
    timeAndDate: {
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
