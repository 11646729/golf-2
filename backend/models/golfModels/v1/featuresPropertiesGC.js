import mongoose, { Schema } from "mongoose"

const featuresPropertiesGC = new Schema({
  name: { type: String },
  phoneNumber: { type: String },
})

export const FeaturesProperties = mongoose.model(
  "featuresPropertiesGolfClub",
  featuresPropertiesGC
)
