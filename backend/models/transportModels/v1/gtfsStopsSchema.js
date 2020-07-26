import mongoose, { Schema } from "mongoose"

const gtfsStopsSchema = new Schema(
  {
    databaseVersion: Number,
    agency_key: String,
    stop_id: Number,
    stop_code: String,
    stop_name: String,
    stop_desc: String,
    stop_lat: Number,
    stop_lon: Number,
    zone_id: String,
    stop_url: String,
    location_type: Number,
    parent_station: String,
    stop_timezone: String,
    wheelchair_boarding: Number,
  },
  {
    timestamps: true,
  }
)

gtfsStopsSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject()
  object.id = _id
  return object
})

// Export model
export const GtfsStopsSchema = mongoose.model("stops", gtfsStopsSchema)
