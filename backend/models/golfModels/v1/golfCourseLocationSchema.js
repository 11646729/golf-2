import mongoose, { Schema } from "mongoose"

const golfCourseLocationSchema = new Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
})

export const GolfCourseLocationSchema = mongoose.model(
  "golfCourseLocation",
  golfCourseLocationSchema
)
