var mongoose = require("mongoose")

var Schema = mongoose.Schema

var PortSchema = new Schema(
  {
    port_name: { type: String, default: "Belfast" },
    port_un_locode: { type: String, default: "GBBEL" }
    //    location: { type: Point, coordinates: [555, 5459] }
  },
  {
    timestamps: true
  }
)

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
