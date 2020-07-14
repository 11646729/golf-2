import mongoose, { Schema } from "mongoose"

// NB No id created to eliminate _id problem
const gtfsCoordsSchema = new Schema(
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
export const GtfsCoordsSchema = mongoose.model("gtfsCoords", gtfsCoordsSchema)
