var cruise = require("../models/cruiseShipping/cruise")
var itinerary = require("../models/cruiseShipping/itinerary")
var port = require("../models/cruiseShipping/port")
var vessel = require("../models/cruiseShipping/vessel")

// Display list of all Cruises
exports.cruise = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Cruise")
}

// Display list of all Vessels
exports.vessel = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Vessel")
}

// Display list of Itineraries
exports.itinerary = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Itinerary")
}

// Display list of Ports
exports.port = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Port")
}
