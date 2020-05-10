import mongoose, { Schema } from "mongoose"

const locationSchema = new Schema({
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

// Export model
export const LocationSchema = mongoose.model("portArrival", locationSchema)
