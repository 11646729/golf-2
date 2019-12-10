var mongoose = require("mongoose")

var Schema = mongoose.Schema

var ItinerarySchema = new Schema(
  {
    //
    // TODO - including Photo
    //
  },
  {
    timestamps: true
  }
)

// Export model
module.exports = mongoose.model("Itinerary", ItinerarySchema)
