import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/v1/coordsSchema"

const gtfsRouteSchema = new Schema(
  {
    databaseVersion: { type: Number },
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

gtfsRouteSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const GtfsRouteSchema = mongoose.model("gtfsRoutes", gtfsRouteSchema)
