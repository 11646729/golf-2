import mongoose, { Schema } from "mongoose"

const coordsSchema = new Schema({
  lat: { type: Number, required: true },
  lng: {
    type: Number,
    required: true,
  },
})

// Export model
export const CoordsSchema = mongoose.model("coords", coordsSchema)
