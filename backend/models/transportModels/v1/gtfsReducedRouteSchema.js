import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const gtfsReducedRouteLineStringSchema = new Schema(
  {
    databaseVersion: { type: Number },
    markerType: { type: String },
    routeKey: { type: String },
    routeColor: { type: String },
    routeLongName: { type: String },
    routeShortName: { type: String },
    shapeCoordinates: [{ type: CoordsSchema.schema }],
  },
  {
    timestamps: true,
  }
)

gtfsReducedRouteLineStringSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const GtfsReducedRouteLineStringSchema = mongoose.model(
  "reducedRouteLineString",
  gtfsReducedRouteLineStringSchema
)
