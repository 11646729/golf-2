import mongoose, { Schema } from "mongoose"

const featuresLocationSchema = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
})

export const featuresLocationGolfCourse = mongoose.model(
  "featuresLocationGolfCourse",
  featuresLocationSchema
)
