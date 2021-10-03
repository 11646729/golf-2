import axios from "axios"
import cheerio from "cheerio"
import { DateTime } from "luxon"

import { urlencoded } from "express"
import { openSqlDbConnection, closeSqlDbConnection } from "../fileUtilities.js"

function VesselDetails(lat, lng, timestamp, destination) {
  this.lat = lat
  this.lng = lng
  this.timestamp = timestamp
  this.destination = destination
}

// -------------------------------------------------------
// Create Vessels Table in the SQLite Database
// Path: Function called in switchBoard
// -------------------------------------------------------
export const createVesselsTable = async (db) => {
  // Guard clause for null Database Connection
  if (db === null) return

  try {
    const sql =
      "CREATE TABLE IF NOT EXISTS vessels (vesselid INTEGER PRIMARY KEY AUTOINCREMENT, databaseversion INTEGER, vesselnameurl TEXT NOT NULL, title TEXT NOT NULL, vesseltype TEXT NOT NULL, vesselname TEXT NOT NULL, vesselflag TEXT NOT NULL, vesselshortoperator TEXT NOT NULL, vessellongoperator TEXT NOT NULL, vesselyearbuilt TEXT NOT NULL, vessellengthmetres INTEGER, vesselwidthmetres INTEGER, vesselgrosstonnage INTEGER, vesselaveragespeedknots REAL, vesselmaxspeedknots REAL, vesselaveragedraughtmetres REAL, vesselimonumber INTEGER, vesselmmsnumber INTEGER, vesselcallsign TEXT NOT NULL, vesseltypicalpassengers TEXT, vesseltypicalcrew INTEGER)"

    db.run(sql, (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log("vessels table successfully created")
    })
  } catch (e) {
    console.error(e.message)
  }
}

// -------------------------------------------------------
// Save Vessel details to SQLite database
// Path:
// -------------------------------------------------------
export const saveVessel = (db, newVessel) => {
  // Guard clause for null Vessel details
  if (db === null) return
  if (newVessel == null) return

  try {
    // Count the records in the database
    let sql1 = "SELECT COUNT(vesselid) AS count FROM vessels"

    // Must be get to work - db.all doesn't work
    db.get(sql1, [], (err, results) => {
      if (err) {
        return console.error(err.message)
      }
      // console.log("Record Count Before Insertion: ", results.count)
    })

    // Don't change the routine below
    const sql2 =
      "INSERT INTO vessels (databaseversion, vesselnameurl, title, vesseltype, vesselname, vesselflag, vesselshortoperator, vessellongoperator, vesselyearbuilt, vessellengthmetres, vesselwidthmetres, vesselgrosstonnage, vesselaveragespeedknots, vesselmaxspeedknots, vesselaveragedraughtmetres, vesselimonumber, vesselmmsnumber, vesselcallsign, vesseltypicalpassengers, vesseltypicalcrew) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)"

    db.run(sql2, newVessel, function (err) {
      if (err) {
        return console.error(err.message)
      }
      // console.warn("New id of inserted vessel:", this.lastID)
    })
  } catch (err) {
    console.error("Error in SQLsaveVessel: ", err)
  }
}

// -------------------------------------------------------
// Delete all Vessels from SQLite database
// Path:
// -------------------------------------------------------
export const deleteAllVessels = (db) => {
  // Guard clause for null Database Connection
  if (db === null) return

  try {
    const sql_insert = "DELETE FROM vessels"
    db.run(sql_insert, (err) => {
      if (err) {
        return console.error("Here", err.message)
      }
      console.warn("All vessels deleted")
    })

    // Reset the id number
    const sql_reset =
      "UPDATE sqlite_sequence SET seq = 0 WHERE name = 'vessels'"
    db.all(sql_reset, [], (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.warn("Reset vessels id number")
    })
  } catch (err) {
    console.error("Error in deleteAllVessels: ", err)
  }
}

// -------------------------------------------------------
// Drop vessels Table from SQLite database
// Path:
// -------------------------------------------------------
export const dropVesselsTable = (db) => {
  // Guard clause for null Database Connection
  if (db === null) return

  try {
    const vessels_drop = "DROP TABLE IF EXISTS vessels"
    db.all(vessels_drop, [], (err, results) => {
      if (err) {
        return console.error(err.message)
      }
      console.log("vessels Table successfully dropped")
    })
  } catch (err) {
    console.error("Error in dropVesselsTable: ", err)
  }
}

// -------------------------------------------------------
// Find vesselNameUrl from vessels Table from SQLite database
// Path:
// -------------------------------------------------------
export const getVesselPosition = async () => {
  const urls = []
  urls.push("https://www.cruisemapper.com/ships/Anthem-of-the-Seas-801")
  urls.push("https://www.cruisemapper.com/ships/Sky-Princess-2154")

  // Now need to remove duplicates & get current location

  // Now remove duplicates and store Urls in DeduplicatedVesselUrlArray array
  // const DeduplicatedVesselUrlArray = Array.from(new Set(vesselUrls))

  // urls.forEach(function (item, index, array) {
  //   console.log(item, index)
  // })

  // Fetch the initial data
  const { data: html } = await axios.get(urls[0])

  // Load up cheerio
  const $ = cheerio.load(html) // html

  // Paragraph containing position & time reported
  let positionParagraph = $(
    "#container > main > section > article > section > div:nth-child(3) > div > div.col-md-4.currentItineraryInfo > p"
  )
    .text()
    .trim()

  let VesselName = positionParagraph.substring(
    0,
    positionParagraph.indexOf("current ") - 1
  )
  console.log("VesselName: " + VesselName)

  var lat = positionParagraph.substring(
    positionParagraph.indexOf("coordinates ") + 12,
    positionParagraph.indexOf("/") - 2
  )
  var lng = positionParagraph.substring(
    positionParagraph.indexOf("/") + 2,
    positionParagraph.indexOf(")") - 2
  )

  console.log("Latitude: " + lat)
  console.log("Longitude: " + lng)

  let secs = 0
  if (positionParagraph.includes("second")) {
    secs = 7
    if (positionParagraph.includes("seconds")) {
      secs = 8
    }
  }

  let mins = 0
  if (positionParagraph.includes("minute")) {
    mins = 7
    if (positionParagraph.includes("minutes")) {
      mins = 8
    }
  }

  var aistime = DateTime.now()
    .minus({ minutes: mins, seconds: secs })
    .toString()

  // console.log("Time Now: " + DateTime.now().toString())
  // console.log("Mins: " + mins)
  // console.log("Secs: " + secs)
  console.log("AIS Reported Time: " + aistime)

  var VesselDest = positionParagraph.substring(
    positionParagraph.indexOf("route to ") + 9,
    positionParagraph.indexOf(". The")
  )

  var destination =
    VesselDest[0].toUpperCase() + VesselDest.substring(1).toLowerCase()

  console.log("Destination: " + destination)

  // var Anthem = new VesselDetails(
  //   url,
  //   lat,
  //   lng,
  //   aistime,
  //   destination
  // )

  // return Anthem
}

export default saveVessel
