import mongoose, { Schema } from "mongoose"

// NB No id created to eliminate _id problem
const tripIdSchema = new Schema(
  {
    tripId: { type: Number, required: true },
  },
  { _id: false }
)

// Export model
export const TripIdSchema = mongoose.model("tripId", tripIdSchema)
