var mongoose = require("mongoose")

var Schema = mongoose.Schema

var PortSchema = new Schema(
  {
    port_name: { type: String, default: "Belfast" },
    port_locode: { type: String, default: "GBBEL" },
    location: { type: "Point", coordinates: [555, 5459] }
  },
  {
    timestamps: true
  }
)

// Export model
module.exports = mongoose.model("port", PortSchema)
