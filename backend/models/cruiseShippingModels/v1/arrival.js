import mongoose from "mongoose"

var Schema = mongoose.Schema

var ArrivalSchema = new Schema({
  database_version: { type: Number, default: 1.0 },
  port_name: { type: String, default: "Belfast" },
  port_un_locode: { type: String, default: "GBBEL" },
  vessel_shortcruise_name: { type: String, default: "" },
  vessel_eta: { type: Date },
  vessel_etd: { type: Date },
  vessel_name_url: {
    type: String,
    required: true
  }
})

// Export model
module.exports = mongoose.model("arrival", ArrivalSchema)
