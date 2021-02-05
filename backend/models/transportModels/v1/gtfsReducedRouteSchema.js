import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const gtfsReducedRouteSchema = new Schema(
  {
    databaseVersion: { type: Number },
    routeVisible: { type: Boolean },
    agencyName: { type: String },
    markerType: { type: String },
    shapeKey: { type: String },
    routeColor: { type: String },
    routeLongName: { type: String },
    routeNumber: { type: String },
    shapeCoordinates: [{ type: CoordsSchema.schema }],
  },
  {
    timestamps: true,
  }
)

gtfsReducedRouteSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const GtfsReducedRouteSchema = mongoose.model(
  "gtfsReducedRoutes",
  gtfsReducedRouteSchema
)
