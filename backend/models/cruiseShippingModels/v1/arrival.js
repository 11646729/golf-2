var mongoose = require("mongoose")

var Schema = mongoose.Schema

var ArrivalSchema = new Schema({
  database_version: { type: Number, default: 1.0, required: true },
  port_name: { type: String, default: "Belfast", required: true },
  port_un_locode: { type: String, default: "GBBEL", required: true },
  vessel_shortcruise_name: { type: String, default: "" },
  vessel_eta: { type: Date },
  vessel_etd: { type: Date },
  vessel_name_url: {
    type: String,
    required: true
  }
})

// databaseVersion: '1.0',
//     port_name: 'Belfast',
//     port_un_locode: 'GBBEL',
//     vessel_shortcruise_name: 'L\'Austral',
//     vessel_eta: 'Invalid Date',
//     vessel_etd: 'Invalid Date',
//vessel_name_url: "https://www.cruisemapper.com/ships/LAustral-756"

// Export model
module.exports = mongoose.model("arrival", ArrivalSchema)
