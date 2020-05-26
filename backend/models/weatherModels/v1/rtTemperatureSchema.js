import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const rtTemperatureSchema = new Schema(
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

rtTemperatureSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const HomeTemperatureSchema = mongoose.model(
  "rtTemperature",
  rtTemperatureSchema
)
