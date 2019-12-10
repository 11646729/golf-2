var mongoose = require("mongoose")

var Schema = mongoose.Schema

var PortSchema = new Schema(
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
module.exports = mongoose.model("port", PortSchema)
