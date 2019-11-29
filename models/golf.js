var mongoose = require("mongoose")

var Schema = mongoose.Schema

var GolfSchema = new Schema({
  //
  // TODO - including Photo
  //
})

// Export model
module.exports = mongoose.model("Golf", GolfSchema)
