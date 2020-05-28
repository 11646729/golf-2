import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const temperatureSchema = new Schema(
  {
    databaseVersion: Number,
    timeOfMeasurement: String,
    locationName: String,
    locationCoordinates: CoordsSchema.schema,
    locationTemperature: Number,
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
