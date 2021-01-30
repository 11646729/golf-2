import mongoose, { Schema } from "mongoose"

const gtfsUniqueReducedRouteSchema = new Schema(
  {
    databaseVersion: { type: Number },
    routeVisible: { type: Boolean },
    markerType: { type: String },
    shapeKey: { type: String },
    routeColor: { type: String },
    routeLongName: { type: String },
    busRouteNumber: { type: String },
  },
  {
    timestamps: true,
  }
)

gtfsUniqueReducedRouteSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const GtfsUniqueReducedRouteSchema = mongoose.model(
  "uniqueReducedRoutes",
  gtfsUniqueReducedRouteSchema
)