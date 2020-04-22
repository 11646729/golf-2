import mongoose, { Schema } from "mongoose"

var ItinerarySchema = new Schema({
  //
  // TODO - including Photo
  //
})

// Export model
export const CruiseItinerary = mongoose.model("Itinerary", ItinerarySchema)
