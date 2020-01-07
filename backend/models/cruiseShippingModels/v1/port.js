import mongoose from "mongoose"

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
