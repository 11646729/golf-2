import mongoose from "mongoose"

var Schema = mongoose.Schema

var ArrivalSchema = new Schema(
  // {
  //   "databaseVersion": "1.0",
  //   "port_name": "Belfast",
  //   "port_un_locode": "GBBEL",
  //   "port_longitude": "-5.89831",
  //   "port_latitude": "54.61750",
  //   "vessel_shortcruise_name": "CMV Astoria",
  //   "vessel_eta": "Fri, 05 Apr 2019 07:00:00 GMT",
  //   "vessel_etd": "Fri, 05 Apr 2019 14:00:00 GMT",
  //   "vessel_name_url": "https://www.cruisemapper.com/ships/CMV-Astoria-821"
  // }
  {
    database_version: { type: Number, default: 1.0 },
    port_name: { type: String, default: "Belfast" },
    port_un_locode: { type: String, default: "GBBEL" },
    port_longitude: { type: Number, default: "-5.89831" },
    port_latitude: { type: Number, default: "54.61750" },
    vessel_shortcruise_name: { type: String, default: "" },
    vessel_eta: { type: Date },
    vessel_etd: { type: Date },
    vessel_name_url: {
      type: String,
      required: true
    }
  }
)

// Export model
module.exports = mongoose.model("arrival", ArrivalSchema)
