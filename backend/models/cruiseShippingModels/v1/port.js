var mongoose = require("mongoose")

var Schema = mongoose.Schema

var PortSchema = new Schema({
  port_name: { type: String, default: "Belfast" },
  port_un_locode: { type: String, default: "GBBEL" },
  port_location: { type: String, enum: ["Point"], required: true },
  coordinates: {
    type: [Number],
    required: true
  }
})

// Export model
module.exports = mongoose.model("port", PortSchema)

// * An id
// * Name
// * A set of Coordinates
// * A Description
// * A Time & Date of Arrival
// * A Time & Date of Departure
// * A Port (Location)
// * A Berthing Location
// * A Shipping Agent
// * A set of Excursions
