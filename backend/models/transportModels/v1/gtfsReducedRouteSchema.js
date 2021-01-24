import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const gtfsReducedRouteSchema = new Schema(
  {
    databaseVersion: { type: Number },
    markerType: { type: String },
    shapeKey: { type: String },
    routeColor: { type: String },
    routeLongName: { type: String },
    busRouteNumber: { type: String },
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
  "reducedRoutes",
  gtfsReducedRouteSchema
)
