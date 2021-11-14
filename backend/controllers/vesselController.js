import axios from "axios"
import cheerio from "cheerio"
import moment from "moment"

// import { urlencoded } from "express"
// import { openSqlDbConnection, closeSqlDbConnection } from "../fileUtilities.js"

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
        return console.error("Error: ", err.message)
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
export const getVesselPosition = async (req, res) => {
  // Dummy data
  const urls = []
  urls.push("https://www.cruisemapper.com/ships/Anthem-of-the-Seas-801")
  urls.push("https://www.cruisemapper.com/ships/Sky-Princess-2154")

  // Now remove duplicates and store Urls in DeduplicatedVesselUrlArray array
  // const DeduplicatedVesselUrlArray = Array.from(new Set(vesselUrls))

  // Now get current location & destination
  var shipPositions = []

  var j = 0
  do {
    // Fetch the initial data
    const { data: html } = await axios.get(urls[j])

    // Load up cheerio
    const $ = cheerio.load(html) // html

    // Paragraph containing position & time reported
    let positionParagraph = $(
      "#container > main > section > article > section > div:nth-child(3) > div > div.col-md-4.currentItineraryInfo > p"
    )
      .text()
      .trim()

    // Name of Vessel
    let vesselName = positionParagraph.substring(
      0,
      positionParagraph.indexOf("current ") - 1
    )

    // Reported Position
    var latitude = Number(
      positionParagraph
        .substring(
          positionParagraph.indexOf("coordinates ") + 12,
          positionParagraph.indexOf("/") - 2
        )
        .trim()
    )
    var longitude = Number(
      positionParagraph
        .substring(
          positionParagraph.indexOf("/") + 2,
          positionParagraph.indexOf(")") - 2
        )
        .trim()
    )

    // AIS Reported Time
    let secs = 0
    if (positionParagraph.includes("second")) {
      var secs1 = positionParagraph.substring(
        positionParagraph.indexOf("second"),
        positionParagraph.indexOf("second") - 2
      )

      secs = secs1.trim()

      if (positionParagraph.includes("seconds")) {
        var secs2 = positionParagraph.substring(
          positionParagraph.indexOf("seconds"),
          positionParagraph.indexOf("seconds") - 3
        )

        secs = secs2.trim()
      }
    }

    let mins = 0
    if (positionParagraph.includes("minute")) {
      var mins1 = positionParagraph.substring(
        positionParagraph.indexOf("minute"),
        positionParagraph.indexOf("minute") - 2
      )

      mins = mins1.trim()

      if (positionParagraph.includes("minutes")) {
        var mins2 = positionParagraph.substring(
          positionParagraph.indexOf("minutes"),
          positionParagraph.indexOf("minutes") - 3
        )

        mins = mins2.trim()
      }
    }

    let hrs = 0
    if (positionParagraph.includes("hour")) {
      var hrs1 = positionParagraph.substring(
        positionParagraph.indexOf("hour"),
        positionParagraph.indexOf("hour") - 2
      )

      hrs = hrs1.trim()

      if (positionParagraph.includes("hours")) {
        var hrs2 = positionParagraph.substring(
          positionParagraph.indexOf("hours"),
          positionParagraph.indexOf("hours") - 3
        )

        hrs = hrs2.trim()
      }
    }

    var aistime = moment
      .utc()
      .subtract(hrs, "hours")
      .subtract(mins, "minutes")
      .subtract(secs, "seconds")

    var aistimestamp = new Date(aistime.format())

    // Destination
    var vesselDest = positionParagraph.substring(
      positionParagraph.indexOf("route to ") + 9,
      positionParagraph.indexOf(". The")
    )

    var destination =
      vesselDest[0].toUpperCase() + vesselDest.substring(1).toLowerCase()

    var shipPosition = {
      index: j,
      vesselUrl: urls[j],
      vesselName: vesselName,
      lat: latitude,
      lng: longitude,
      timestamp: aistimestamp,
      destination: destination,
    }

    shipPositions.push(shipPosition)

    j++
  } while (j < urls.length)

  res.send(shipPositions)
}

// -------------------------------------------------------
// Find vesselNameUrl from vessels Table from SQLite database
// Path:
// -------------------------------------------------------
export const getVesselPositionTestData = async (req, res) => {
  var longlats = [
    [55.95473, -4.758], // lat, lng
    [55.843985, -4.9333],
    [55.42563, -4.917513],
    [55.001906, -5.34192],
    [54.719465, -5.514335],
    [54.62649822725435, -5.884617360308293],
    [30.95685, -74.87335],
  ]

  let shipPositions = []
  let loop = 0
  var i = setInterval(function () {
    if (loop < longlats.length) {
      var utcMoment = moment.utc()
      var utcDate = new Date(utcMoment.format())

      let shipPosition = {
        index: loop + 1,
        timestamp: utcDate,
        lat: longlats[loop][0],
        lng: longlats[loop][1],
      }

      shipPositions.push(shipPosition)
    } else {
      clearInterval(i)

      // console.log(shipPositions)

      res.send(shipPositions)
    }
    loop++
  }, 0)
}

export default saveVessel
