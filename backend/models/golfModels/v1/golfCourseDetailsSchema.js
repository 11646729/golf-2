import mongoose, { Schema } from "mongoose"
import { GolfCourseLocationSchema } from "./golfCourseLocationSchema"

const golfCourseDetailsSchema = new Schema({
  type: { type: String, default: "Feature" },
  name: { type: String },
  phoneNumber: { type: String },
  location: { type: GolfCourseLocationSchema.schema },
})

export const GolfCourseDetailsSchema = mongoose.model(
  "golfCourseDetails",
  golfCourseDetailsSchema
)
