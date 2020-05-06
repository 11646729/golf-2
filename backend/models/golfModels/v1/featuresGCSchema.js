import mongoose, { Schema } from "mongoose"
import { featuresPropertyGolfCourse } from "./featuresPropertyGCSchema"
import { featuresLocationGolfCourse } from "./featuresLocationGCSchema"

const featuresSchema = new Schema({
  type: { type: String, default: "Feature" },
  projection: { type: featuresLocationGolfCourse },
  properties: { type: featuresPropertyGolfCourse },
})

export const featuresGolfCourse = mongoose.model(
  "featuresGolfCourse",
  featuresSchema
)
