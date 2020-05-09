import mongoose, { Schema } from "mongoose"

const golfCourseLocationSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  latitude: { type: Number },
  longitude: { type: Number },

  // coordinates: {
  //   type: [Number],
  //   index: "2dsphere",
  // },
})

export const GolfCourseLocationSchema = mongoose.model(
  "golfCourseLocation",
  golfCourseLocationSchema
)
