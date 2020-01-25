import mongoose from "mongoose"

var Schema = mongoose.Schema

// --------------------------------------------------------------
// Original belfast cruise site web scraping
// Remember that Timestamp is also saved by default
var VesselSchema = new Schema({
  databaseVersion: { type: Number, default: 1.0 },
  vessel_name_url: {
    type: String,
    default: "https://www.cruisemapper.com/ships/Spirit-of-Discovery-1829"
  },
  title: {
    type: String,
    default: "Spirit of Discovery Review and Specifications"
  },
  vessel_type: { type: String, default: "Cruise Ship" },
  vessel_name: { type: String, default: "Spirit of Discovery" },
  vessel_flag: { type: String, default: " United Kingdom" },
  vessel_short_operator: { type: String, default: "Spirit" },
  vessel_long_operator: { type: String, default: "Saga Cruises" },
  vessel_year_built: { type: Number, default: "2019" },
  vessel_length_metres: { type: String, default: "236 m" },
  vessel_width_metres: { type: String, default: "31 m" },
  vessel_gross_tonnage: { type: String, default: "58250 gt" },
  vessel_average_speed_knots: { type: String, default: "23 kn" },
  vessel_max_speed_knots: { type: String, default: "23 kn" },
  vessel_average_draught_metres: { type: Number, default: "7.9" },
  vessel_imo_number: { type: Number, default: "8217881" },
  vessel_mmsi_number: { type: Number, default: "311000343" },
  vessel_callsign: { type: String, default: "C6BR5" },
  vessel_typical_passengers: { type: String, default: "1000" },
  vessel_typical_crew: { type: String, default: "530" }
})

//
// TODO - Photo
//

// Export model
module.exports = mongoose.model("vessel", VesselSchema)
