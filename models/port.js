var mongoose = require("mongoose")

var Schema = mongoose.Schema

var PortSchema = new Schema({
  //
  // TODO - including Photo
  //
})

// Export model
module.exports = mongoose.model("Port", PortSchema)
