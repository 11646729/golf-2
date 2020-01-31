import mongoose, { Schema } from "mongoose"

var VesselSchema = new Schema(
  {
    databaseVersion: { type: Number, default: 1.0 },
    vessel_name_url: {
      type: String
    },
    title: {
      type: String
    },
    vessel_type: { type: String },
    vessel_name: { type: String },
    vessel_flag: { type: String },
    vessel_short_operator: { type: String },
    vessel_long_operator: { type: String },
    vessel_year_built: { type: String },
    vessel_length_metres: { type: Number },
    vessel_width_metres: { type: Number },
    vessel_gross_tonnage: { type: Number },
    vessel_average_speed_knots: { type: String },
    vessel_max_speed_knots: { type: Number },
    vessel_average_draught_metres: { type: Number },
    vessel_imo_number: { type: Number },
    vessel_mmsi_number: { type: Number },
    vessel_callsign: { type: String },
    vessel_typical_passengers: { type: String },
    vessel_typical_crew: { type: String }
  },
  {
    timestamps: true
  }
)

// Export model
export const Vessel = mongoose.model("vessel", VesselSchema)
