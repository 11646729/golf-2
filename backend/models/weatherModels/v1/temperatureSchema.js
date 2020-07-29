import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const temperatureSchema = new Schema(
  {
    databaseVersion: { type: Number },
    timeOfMeasurement: { type: String },
    locationName: { type: String },
    locationCoordinates: { type: CoordsSchema.schema },
    locationTemperature: { type: Number },
  },
  {
    timestamps: true,
  }
)

temperatureSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const TemperatureSchema = mongoose.model(
  "temperature",
  temperatureSchema
)
