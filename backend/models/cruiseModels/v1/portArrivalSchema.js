import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const portArrivalSchema = new Schema(
  {
    databaseVersion: Number,
    portName: String,
    portUnLocode: String,
    portCoordinates: CoordsSchema.schema,
    vesselShortCruiseName: String,
    vesselEta: String,
    vesselEtd: String,
    vesselNameUrl: String,
  },
  {
    timestamps: true,
  }
)

portArrivalSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const PortArrivalSchema = mongoose.model(
  "portArrival",
  portArrivalSchema
)
