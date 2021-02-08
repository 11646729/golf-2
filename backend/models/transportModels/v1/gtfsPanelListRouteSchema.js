import mongoose, { Schema } from "mongoose"

const gtfsPanelListRouteSchema = new Schema(
  {
    databaseVersion: { type: Number },
    routeVisible: { type: Boolean },
    agencyName: { type: String },
    markerType: { type: String },
    routeKey: { type: String },
    routeColor: { type: String },
    routeLongName: { type: String },
    routeNumber: { type: String },
  },
  {
    timestamps: true,
  }
)

gtfsPanelListRouteSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const GtfsPanelListRouteSchema = mongoose.model(
  "gtfsPanelListRoutes",
  gtfsPanelListRouteSchema
)
