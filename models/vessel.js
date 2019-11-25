var mongoose = require("mongoose")

var Schema = mongoose.Schema

var VesselSchema = new Schema({
  vessel_type: { type: String }, // CMV Magellan Review and Specifications
  vessel_photo: { type: binary }, // url
  ais_name: { type: String }, // *** TODO ***
  vessel_name: { type: String }, // Magellan
  vessel_flag: { type: String }, // Madeira
  short_operator: { type: String }, // CMV
  long_operator: { type: String }, // Cruise and Maritime Voyages
  year_built: { type: Integer }, // 1985
  vessel_length_metres: { type: Integer }, // 221
  vessel_width_metres: { type: Integer }, // 32
  average_draught_metres: { type: Double }, // 7.9
  vessel_gross_tonnage: { type: Integer }, // 46052
  average_speed_knots: { type: Double }, // 13.5
  max_speed_knots: { type: Double }, // 21.7
  imo_number: { type: Integer }, // 8217881
  mmsi_number: { type: Integer }, // 311000343
  vessel_callsign: { type: Integer }, //C6BR5
  typical_passengers: { type: Integer }, // 1250
  typical_crew: { type: Integer } // 660
})

// Virtual for vessel length in feet
VesselSchema.virtual("vessel_length_feet").get(function() {
  return this.vessel_length_metres * 3.28084
})

// Virtual for vessel width in feet
VesselSchema.virtual("vessel_width_feet").get(function() {
  return this.vessel_width_metres * 3.28084
})

// Virtual for vessel's url
VesselSchema.virtual("url").get(function() {
  return "/catalog/vessel/" + this._id
})

//
// TODO - Photo
//

// Export model
module.exports = mongoose.model("Vessel", VesselSchema)
