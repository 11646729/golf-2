import mongoose, { Schema } from "mongoose"

const featuresPropertySchema = new Schema({
  name: { type: String },
  phoneNumber: { type: String },
})

export const featuresPropertyGolfCourse = mongoose.model(
  "featuresPropertyGolfCourse",
  featuresPropertySchema
)
