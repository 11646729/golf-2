var mongoose = require("mongoose")

var Schema = mongoose.Schema

var CruiseSchema = new Schema({
  //
  // TODO - including Photo
  //
})

// Export model
module.exports = mongoose.model("cruise", CruiseSchema)
