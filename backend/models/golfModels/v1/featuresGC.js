import mongoose, { Schema } from "mongoose"
import { FeaturesLocation } from "./featuresLocationGC"
import { FeaturesProperties } from "./featuresPropertiesGC"

const featuresGC = new Schema({
  type: { type: String, default: "Feature" },
  projection: { FeaturesLocation },
  properties: { FeaturesProperties },
})

export const Features = mongoose.model("featuresGolfCourse", featuresGC)
