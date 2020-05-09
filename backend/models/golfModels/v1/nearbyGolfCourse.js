import mongoose, { Schema } from "mongoose"
import { GolfCourseDetailsSchema } from "./golfCourseDetails"

const nearbyGolfCourseSchema = new Schema(
  {
    databaseVersion: { type: Number, default: 1.0 },
    type: { type: String, default: "FeatureCollection" },
    crsName: { type: String, default: "WGS84" },
    crsUrn: { type: String, default: "urn:ogc:def:crs:OGC:1.3:CRS84" },
    courses: [{ type: GolfCourseDetailsSchema.schema }],
  },
  {
    timestamps: true,
  }
)

export const NearbyGolfCourseSchema = mongoose.model(
  "nearbyGolfCourse",
  nearbyGolfCourseSchema
)
