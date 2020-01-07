import mongoose from "mongoose"

var Schema = mongoose.Schema

var ItinerarySchema = new Schema({
  //
  // TODO - including Photo
  //
})

// Export model
module.exports = mongoose.model("Itinerary", ItinerarySchema)
