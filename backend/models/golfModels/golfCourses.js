import mongoose, { Schema } from "mongoose"

const GeoSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
})

// var Schema = mongoose.Schema

const nearbyGolfCoursesSchema = new Schema({
  //
  // TODO - including Photo
  //
})

// Export model
export const NearbyGolfCourses = mongoose.model(
  "nearbyCourses",
  nearbyGolfCoursesSchema
)
