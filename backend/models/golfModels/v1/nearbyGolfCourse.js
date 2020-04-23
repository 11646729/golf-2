import mongoose, { Schema } from "mongoose"

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Golf Course",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
})

const nearbyGolfCourseSchema = new Schema(
  {
    database_version: { type: Number, default: 1.0 },
    location_name: { type: String },
    location_coords: { type: GeoSchema },
    location_phone_number: { type: String },
  },
  {
    timestamps: true,
  }
)

// Export model
export const NearbyGolfCourse = mongoose.model(
  "nearbyGolfCourse",
  nearbyGolfCourseSchema
)
