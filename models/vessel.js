var mongoose = require("mongoose")

var Schema = mongoose.Schema

var VesselSchema = new Schema()

//
// TODO
//

// Export model
module.exports = mongoose.model("Vessel", VesselSchema)
