var mongoose = require("mongoose")

var Schema = mongoose.Schema

var ArrivalSchema = new Schema({
  arrival_date: { type: String, default: "" },
  arrival_day: { type: String, default: "" },
  vessel_shortcruise_name: { type: String, default: "" },
  vessel_eta: { type: Number, default: "" },
  vessel_etd: { type: Number, default: "" },
  vessel_name_url: {
    type: String,
    default: ""
  }
})

// ArrivalSchema.virtual("url").get(function() {
//   var str = this.arrival_date
//   var n = str.length

//   //  return this.arrival_date.substr(this.arrival_date)
// })

// var year = '2013';
// var month = '04';
// var day = '18';

// var hour = '12';
// var min = '35';

// var reserv = new Date(year,month,day,hour,min)

// console.log(reserv);

// Export model
module.exports = mongoose.model("arrival", ArrivalSchema)
