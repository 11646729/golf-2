import mongoose, { Schema } from "mongoose"
import { featuresGolfCourse } from "./featuresGCSchema"

const nearbyGolfCourseSchema = new Schema(
  {
    type: { type: headerSchema },
    features: [featuresGolfCourse],
  },
  {
    timestamps: true,
  }
)

export const NearbyGolfCourse = mongoose.model(
  "NearbyGolfCourse",
  nearbyGolfCourseSchema
)
