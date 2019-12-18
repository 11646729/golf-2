var mongoose = require("mongoose")

var Schema = mongoose.Schema

var ArrivalSchema = new Schema({
  port_url: {
    type: String,
    default: "https://www.cruisemapper.com/ports/belfast-port-114"
  },
  port_name: { type: String, default: "Belfast" },
  port_locode: { type: String, default: "GBBEL" },
  port_location: { type: String, enum: ["Point"], required: true },
  coordinates: {
    type: [Number],
    required: true
  },
  arrival_date: { type: String, default: "14 March, 2020" },
  arrival_day: { type: String, default: "Saturday" },
  vessel_shortcruise_name: { type: String, default: "CMV Astoria" },
  vessel_eta: { type: Number, default: "03:00" },
  vessel_etd: { type: Number, default: "14:00" },
  vessel_name_url: {
    type: String,
    default: "https://www.cruisemapper.com/ships/CMV-Astoria-821"
  },
  timestamps: true
})

// Export model
module.exports = mongoose.model("arrival", ArrivalSchema)
