import mongoose, { Schema } from "mongoose"

const gtfsRoutesSchema = new Schema(
  {
    databaseVersion: Number,
    agency_key: String,
    route_id: Number,
    agency_id: Number,
    route_short_name: String,
    route_long__name: String,
    route_desc: String,
    route_type: Number,
    route_url: String,
    route_color: String,
    route_text_color: String,
  },
  {
    timestamps: true,
  }
)

gtfsRoutesSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const GtfsRoutesSchema = mongoose.model(
  "translink_routes",
  gtfsRoutesSchema
)
