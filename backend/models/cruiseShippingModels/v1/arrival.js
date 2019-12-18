var mongoose = require("mongoose")

var Schema = mongoose.Schema

var ArrivalSchema = new Schema(
  {
    port_url: {
      type: String,
      default: "https://www.cruisemapper.com/ports/belfast-port-114"
    },
    port_name: { type: String, default: "Belfast" },
    port_locode: { type: String, default: "GBBEL" },
    //    location: { type: Point, coordinates: [555, 5459] },
    arrival_date: { type: String, default: "14 March, 2020" },
    arrival_day: { type: String, default: "Saturday" },
    vessel_name: { type: String, default: "CMV Astoria" },
    eta: { type: Number, default: "03:00" },
    etd: { type: Number, default: "14:00" },
    vessel_name_url: {
      type: String,
      default: "https://www.cruisemapper.com/ships/CMV-Astoria-821"
    }
  },
  {
    timestamps: true
  }
)

// Export model
module.exports = mongoose.model("arrival", ArrivalSchema)

// * Date of the Month
// * Day of Week
// * Arrival Time
// * Departure Time
// * Name of Ship - including - Short Cruise Line
