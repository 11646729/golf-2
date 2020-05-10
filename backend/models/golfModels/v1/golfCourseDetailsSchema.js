import mongoose, { Schema } from "mongoose"
import { LocationSchema } from "../../commonModels/locationSchema"

const golfCourseDetailsSchema = new Schema({
  type: { type: String, default: "Feature" },
  name: { type: String },
  phoneNumber: { type: String },
  location: { type: LocationSchema.schema },
})

export const GolfCourseDetailsSchema = mongoose.model(
  "golfCourseDetails",
  golfCourseDetailsSchema
)
