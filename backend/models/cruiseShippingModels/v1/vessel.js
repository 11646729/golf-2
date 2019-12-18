var mongoose = require("mongoose")

var Schema = mongoose.Schema

// --------------------------------------------------------------
// Original belfast cruise site web scraping
// Remember that Timestamp is also saved by default
var VesselSchema = new Schema({
  databaseVersion: { type: Number }, // 1.0
  pageUrl: { type: String }, // "https://www.cruisemapper.com/ports/belfast-port-114"
  day: { type: Number }, // 25
  month: { type: Number }, // 9
  year: { type: Number }, // 2019
  eta: { type: String }, // "06:15"
  etd: { type: String }, // "19:00"
  company: { type: String }, // "Hapag Lloyd"
  vesselName: { type: String } // "Hanseatic Nature"
})

//
// TODO - Photo
//

// Export model
module.exports = mongoose.model("vessel", VesselSchema)
