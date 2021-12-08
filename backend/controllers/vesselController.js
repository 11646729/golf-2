import axios from "axios"
import cheerio from "cheerio"
import moment from "moment"

// -------------------------------------------------------
// Create Vessels Table in the SQLite Database
// Path: Function called in switchBoard
// -------------------------------------------------------
export const createVesselsTable = async (db) => {
  // Guard clause for null Database Connection
  if (db === null) return

  try {
    const sql =
      "CREATE TABLE IF NOT EXISTS vessels (vesselid INTEGER PRIMARY KEY AUTOINCREMENT, databaseversion INTEGER, vesselnameurl TEXT NOT NULL, title TEXT NOT NULL, vesseltype TEXT NOT NULL, vesselname TEXT NOT NULL, vesselflag TEXT NOT NULL, vesselshortoperator TEXT NOT NULL, vessellongoperator TEXT NOT NULL, vesselyearbuilt TEXT NOT NULL, vessellengthmetres INTEGER, vesselwidthmetres INTEGER, vesselgrosstonnage INTEGER, vesselaveragespeedknots REAL, vesselmaxspeedknots REAL, vesselaveragedraughtmetres REAL, vesselimonumber INTEGER, vesselmmsnumber INTEGER, vesselcallsign TEXT NOT NULL, vesseltypicalpassengers TEXT, vesseltypicalcrew INTEGER, currentpositionlng REAL CHECK( currentpositionlng >= -180 AND currentpositionlng <= 180 ), currentpositionlat REAL CHECK( currentpositionlat >= -90 AND currentpositionlat <= 90 ), currentpositiontime TEXT)"

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
      "INSERT INTO vessels (databaseversion, vesselnameurl, title, vesseltype, vesselname, vesselflag, vesselshortoperator, vessellongoperator, vesselyearbuilt, vessellengthmetres, vesselwidthmetres, vesselgrosstonnage, vesselaveragespeedknots, vesselmaxspeedknots, vesselaveragedraughtmetres, vesselimonumber, vesselmmsnumber, vesselcallsign, vesseltypicalpassengers, vesseltypicalcrew, currentpositionlng, currentpositionlat, currentpositiontime) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23)"

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
export const getVesselPositions = async (req, res) => {
  // Dummy data
  const urls = []
  urls.push("https://www.cruisemapper.com/ships/Anthem-of-the-Seas-801")
  urls.push("https://www.cruisemapper.com/ships/Sky-Princess-2154")
  urls.push("https://www.cruisemapper.com/ships/MSC-Bellissima-1359")

  // Now remove duplicates and store Urls in DeduplicatedVesselUrlArray array
  // const DeduplicatedVesselUrlArray = Array.from(new Set(vesselUrls))

  let arrivals = req.query.portArrivals

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

// ----------------------------------------------------------
// Fetch Details of a Single Vessel
// Path: Local function called by fetchPortArrivalsAndVessels
// ----------------------------------------------------------
export const scrapeVessel = async (vessel_url) => {
  // Fetch the initial data
  const { data: html } = await axios.get(vessel_url)

  // Load up cheerio
  const $ = cheerio.load(html)

  // Title
  let vessel_title = $("#review .title").text().trim()

  // Vessel Type
  let vessel_type = "Passenger Ship"

  // Remove " Review" from title to get vessel_name
  let vessel_name = vessel_title.substring(0, vessel_title.length - 7)

  // Vessel Flag
  let vessel_flag = $("td")
    .filter(function () {
      return $(this).text().trim() === "Flag state"
    })
    .next()
    .text()
    .trim()

  // If No Vessel Flag Available
  if (vessel_flag == "") {
    vessel_flag = "Not Known"
  }

  // Short Name of Vessel Operator
  let vessel_short_operator = vessel_title.substr(0, vessel_title.indexOf(" "))

  // Long Name of Vessel Operator
  let vessel_long_operator = $("td")
    .filter(function () {
      return $(this).text().trim() === "Operator"
    })
    .next()
    .text()

  // If No Vessel Operator Available
  if (vessel_long_operator == "") {
    vessel_long_operator = "Not Known"
  }

  // Year of Build
  const vessel_year_built_temp = $("td")
    .filter(function () {
      return $(this).text().trim() === "Year built"
    })
    .next()
    .text()

  let vessel_year_built = vessel_year_built_temp.substr(
    0,
    vessel_year_built_temp.indexOf("/") - 2
  )

  // If No Year of Build Available
  if (vessel_year_built == "") {
    vessel_year_built = "Not Known"
  }

  // Length of Vessel in metres
  const vessel_length_metres_temp = $("td")
    .filter(function () {
      return $(this).text().trim() === "Length (LOA)"
    })
    .next()
    .text()

  let vessel_length_metres = vessel_length_metres_temp.substr(
    0,
    vessel_length_metres_temp.indexOf("/") - 3
  )

  // If No Length of Vessel in metres Available
  if (vessel_length_metres == "") {
    vessel_length_metres = "Not Known"
  }

  // Width of Vessel in metres
  const vessel_width_metres_temp = $("td")
    .filter(function () {
      return $(this).text().trim() === "Beam (width)"
    })
    .next()
    .text()

  let vessel_width_metres = vessel_width_metres_temp.substr(
    0,
    vessel_width_metres_temp.indexOf("/") - 3
  )

  // If No Width of Vessel in metres Available
  if (vessel_width_metres == "") {
    vessel_width_metres = "Not Known"
  }

  // Gross Tonnage of Vessel
  const vessel_gross_tonnage_temp = $("td")
    .filter(function () {
      return $(this).text().trim() === "Gross Tonnage"
    })
    .next()
    .text()

  let vessel_gross_tonnage = vessel_gross_tonnage_temp.substr(
    0,
    vessel_gross_tonnage_temp.indexOf(" ")
  )

  // If No Gross Tonnage of Vessel Available
  if (vessel_gross_tonnage == "") {
    vessel_gross_tonnage = "Not Known"
  }

  // Vessel Average Speed
  // const vessel_average_speed_knots_temp = $("td")
  //   .filter(function() {
  //     return (
  //       $(this)
  //         .text()
  //         .trim() === "Speed"
  //     )
  //   })
  //   .next()
  //   .text()

  // let vessel_average_speed_knots = vessel_average_speed_knots_temp.substr(
  //   0,
  //   vessel_average_speed_knots_temp.indexOf("/") - 4
  // )

  // If No Vessel Average Speed Available
  // if (vessel_average_speed_knots == "") {
  let vessel_average_speed_knots = "Not Known"
  // }

  // Vessel Maximum Speed
  const vessel_max_speed_knots_temp = $("td")
    .filter(function () {
      return $(this).text().trim() === "Speed"
    })
    .next()
    .text()

  let vessel_max_speed_knots = vessel_max_speed_knots_temp.substr(
    0,
    vessel_max_speed_knots_temp.indexOf("/") - 4
  )

  // If No Vessel Maximum Speed Available
  if (vessel_max_speed_knots == "") {
    vessel_max_speed_knots = "Not Known"
  }

  // Vessel Callsign
  let vessel_callsign = "C6BR5"

  // Typical Number of Passengers
  let vessel_typical_passengers = $("td")
    .filter(function () {
      return $(this).text().trim() === "Passengers"
    })
    .next()
    .text()

  // If No Typical Number of Passengers Available
  if (vessel_typical_passengers == "") {
    vessel_typical_passengers = "Not Known"
  }

  // Typical Number of Crew
  let vessel_typical_crew = $("td")
    .filter(function () {
      return $(this).text().trim() === "Crew"
    })
    .next()
    .text()

  let vessel_current_position_lng = 0.0
  let vessel_current_position_lat = 0.0
  let vessel_current_position_time = "Not Known"

  const scrapedVessel = [
    process.env.DATABASE_VERSION,
    vessel_url,
    vessel_title,
    vessel_type, // From where?
    // vessel_photo,
    // vessel_ais_name,
    vessel_name,
    vessel_flag,
    vessel_short_operator,
    vessel_long_operator,
    vessel_year_built,
    vessel_length_metres,
    vessel_width_metres,
    vessel_gross_tonnage,
    vessel_average_speed_knots,
    vessel_max_speed_knots,
    "7.9",
    "8217881",
    "311000343",
    vessel_callsign, // From where?
    vessel_typical_passengers,
    vessel_typical_crew,
    vessel_current_position_lng,
    vessel_current_position_lat,
    vessel_current_position_time,
  ]

  return scrapedVessel
}

export default saveVessel
