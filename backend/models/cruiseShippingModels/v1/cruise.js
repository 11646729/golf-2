var mongoose = require("mongoose")

var Schema = mongoose.Schema

var CruiseSchema = new Schema({
  //
  // TODO - including Photo
  //
  // * A Vessel
  // * An Itinerary (A sequence of visits to Ports) Linked list?
  // * A Description
  // * A Cruise Owner
  // * A Cruise ID
  // * A set of Prices
})

// Export model
module.exports = mongoose.model("cruise", CruiseSchema)
