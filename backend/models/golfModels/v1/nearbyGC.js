import mongoose, { Schema } from "mongoose"
import { Header } from "./headerGC"
import { Features } from "./featuresGC"

const nearbyGC = new Schema(
  {
    type: { Header },
    features: [Features],
  },
  {
    timestamps: true,
  }
)

export const NearbyGolfCourse = mongoose.model("NearbyGolfCourse", nearbyGC)
