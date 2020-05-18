import mongoose, { Schema } from "mongoose"
import { CoordsSchema } from "../../commonModels/coordsSchema"

const golfCourseDetailsSchema = new Schema({
  type: { type: String, default: "Feature" },
  name: { type: String },
  phoneNumber: { type: String },
  location: { type: CoordsSchema.schema },
})

export const GolfCourseDetailsSchema = mongoose.model(
  "golfCourseDetails",
  golfCourseDetailsSchema
)
