import mongoose, { Schema } from "mongoose"
import { HeaderSchema } from "./headerGC"
// import { Features } from "./featuresGC"

const nearbyGCSchema = new Schema(
  {
    type: { type: Schema.Types.ObjectId, ref: "headerGolfCourse" },
    // features: [Features],
  },
  {
    timestamps: true,
  }
)

module.exports = NearbyGolfCourse = mongoose.model(
  "NearbyGolfCourse",
  nearbyGCSchema
)
// export const NearbyGolfCourse = mongoose.model(
//   "NearbyGolfCourse",
//   nearbyGCSchema
// )
