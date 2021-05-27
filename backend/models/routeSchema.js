import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "./coordsSchema"

const routeSchema = new Schema(
  {
    databaseVersion: { type: Number },
    routeFilePath: { type: String },
    routeFileUrl: { type: String },
    agencyName: { type: String },
    agencyId: { type: String },
    markerType: { type: String },
    routeVisible: { type: Boolean },
    routeKey: { type: String },
    routeColor: { type: String },
    routeLongName: { type: String },
    routeNumber: { type: String },
    routeCoordinates: [{ type: CoordsSchema.schema }],
  },
  {
    timestamps: true,
  }
)

routeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const RouteSchema = mongoose.model("routes", routeSchema)
