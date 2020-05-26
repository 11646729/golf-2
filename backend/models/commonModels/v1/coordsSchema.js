import mongoose, { Schema } from "mongoose"

// NB No id created to eliminate _id problem
const coordsSchema = new Schema(
  {
    lat: { type: Number, required: true },
    lng: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
)

// Export model
export const CoordsSchema = mongoose.model("coords", coordsSchema)
