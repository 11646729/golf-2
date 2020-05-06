import mongoose, { Schema } from "mongoose"

const featuresLocationGC = new Schema({
  type: {
    type: String,
    default: "Point",
  },
  coordinates: {
    type: [Number],
    index: "2dsphere",
  },
})

export const FeaturesLocation = mongoose.model(
  "featuresLocationGolfCourse",
  featuresLocationGC
)
