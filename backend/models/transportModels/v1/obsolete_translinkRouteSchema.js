import mongoose, { Schema } from "mongoose"

const translinkRouteSchema = new Schema(
  {
    databaseVersion: { type: Number },
    agency_key: { type: String },
    route_id: { type: Number },
    agency_id: { type: Number },
    route_short_name: { type: String },
    route_long__name: { type: String },
    route_desc: { type: String },
    route_type: { type: Number },
    route_url: { type: String },
    route_color: { type: String },
    route_text_color: { type: String },
  },
  {
    timestamps: true,
  }
)

translinkRouteSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const TranslinkRouteSchema = mongoose.model(
  "translinkroutes",
  translinkRouteSchema
)
