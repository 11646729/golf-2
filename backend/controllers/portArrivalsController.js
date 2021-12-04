import { openSqlDbConnection, closeSqlDbConnection } from "../fileUtilities.js"
import axios from "axios"
import cheerio from "cheerio"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/cruise/
// -------------------------------------------------------
export var index = async (req, res) => {
  res.send({ response: "Port Arrivals Catalog home page" }).status(200)
}

// -------------------------------------------------------
// Create portarrivals Table in the SQLite Database
// -------------------------------------------------------
export const createPortArrivalsTable = (db) => {
  // Guard clause for null Database Connection
  if (db === null) return

  try {
    const sql =
      "CREATE TABLE IF NOT EXISTS portarrivals (portarrivalid INTEGER PRIMARY KEY AUTOINCREMENT, databaseversion INTEGER, sentencecaseport TEXT NOT NULL, portname TEXT NOT NULL, portunlocode TEXT NOT NULL, portcoordinatelng REAL CHECK( portcoordinatelng >= -180 AND portcoordinatelng <= 180 ), portcoordinatelat REAL CHECK( portcoordinatelat >= -90 AND portcoordinatelat <= 90 ), cruiseline TEXT, cruiselinelogo, vesselshortcruisename TEXT, arrivalDate TEXT, weekday TEXT, vesseleta TEXT, vesseletatime TEXT, vesseletd TEXT, vesseletdtime TEXT, vesselnameurl TEXT)"

    db.run(sql, [], (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log("portarrivals table successfully created")
    })
  } catch (e) {
    console.error(e.message)
  }
}

// -------------------------------------------------------
// Drop portarrivals Table in the SQLite database
// -------------------------------------------------------
export const dropPortArrivalsTable = (db) => {
  // Guard clause for null Database Connection
  if (db === null) return

  try {
    const sql = "DROP TABLE IF EXISTS portarrivals"

    db.all(sql, [], (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log("portarrivals Table successfully dropped")
    })
  } catch (e) {
    console.error("Error in dropPortArrivalsTable: ", e.message)
  }
}

// -------------------------------------------------------
// Get all Port Arrivals from SQLite database
// Path: localhost:5000/api/cruise/allPortArrivals
// -------------------------------------------------------
export const getPortArrivals = (req, res) => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      const sql =
        "SELECT * FROM portarrivals WHERE vesseleta >= DATE('now', '-1 day') AND vesseleta < DATE('now', '+1 month') AND vesseletd != 'Not Known'"

      db.all(sql, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }

        res.send(results)
      })

      // Close the Database Connection
      closeSqlDbConnection(db)
    } catch (e) {
      console.error(e.message)
    }
  } else {
    console.error("Cannot connect to database")
  }
}

// -------------------------------------------------------
// Delete all Port Arrivals records from SQLite database
// -------------------------------------------------------
export const deletePortArrivals = (db) => {
  // Guard clause for null Database Connection
  if (db === null) return

  try {
    const sql_insert = "DELETE FROM portarrivals"

    db.all(sql_insert, [], (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.warn("All portarrivals deleted")
    })

    // Reset the id number
    const sql_reset =
      "UPDATE sqlite_sequence SET seq = 0 WHERE name = 'portarrivals'"

    db.all(sql_reset, [], (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.warn("Reset portarrivals id number")
    })
  } catch (e) {
    console.error("Error in deletePortArrivals: ", e.message)
  }
}

// -------------------------------------------------------
// Save Port Arrivals details to SQLite database
// -------------------------------------------------------
export const savePortArrival = (db, newPortArrival) => {
  // Guard clause for null Port Arrival details
  if (newPortArrival == null) return
  if (db === null) return

  // TODO
  // Add Notification of change (except End of Month rollover)
  // Details of this Cruise?
  // Current Position - to plot on a map

  try {
    // Count the records in the database
    let sql1 = "SELECT COUNT(portarrivalid) AS count FROM portarrivals"

    // Must be get to work - db.all doesn't work
    db.get(sql1, [], (err) => {
      if (err) {
        return console.error(err.message)
      }
    })

    // Don't change the routine below
    const sql2 =
      "INSERT INTO portarrivals (databaseversion, sentencecaseport, portname, portunlocode, portcoordinatelng, portcoordinatelat, cruiseline, cruiselinelogo, vesselshortcruisename, arrivalDate, weekday, vesseleta, vesseletatime, vesseletd, vesseletdtime, vesselnameurl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)"

    db.run(sql2, newPortArrival, function (err) {
      if (err) {
        return console.error(err.message)
      }
    })
  } catch (err) {
    console.error("Error in SQLsavePortArrival: ", err)
  }
}

// -------------------------------------------------------
// Fetch All Port Arrivals Details
// Path: Local function called by fetchPortArrivalsAndVessels
// -------------------------------------------------------
export const getAndSavePortArrivals = async (
  db,
  scheduledPeriods,
  port,
  portName
) => {
  let allVesselArrivals = []
  let periodVesselArrivals = []

  let loop = 0
  do {
    const period = String(scheduledPeriods[loop].monthYearString)
    periodVesselArrivals = await getSingleMonthPortArrival(
      db,
      period,
      port,
      portName
    )

    let j = 0
    do {
      allVesselArrivals.push(periodVesselArrivals[j])

      j++
    } while (j < periodVesselArrivals.length)

    loop++
  } while (loop < scheduledPeriods.length)

  return allVesselArrivals
}

// -----------------------------------------------------
// Fetch a Single Port Arrival
// Path: Local function called by getAndSavePortArrivals
// -----------------------------------------------------
export const getSingleMonthPortArrival = async (db, period, port, portName) => {
  let arrivalUrl =
    process.env.CRUISE_MAPPER_URL +
    portName +
    "?tab=schedule&month=" +
    period +
    "#schedule"

  const { data: html } = await axios.get(arrivalUrl)

  // load up cheerio
  const $ = cheerio.load(html)

  // let vesselArrival = []
  let vesselUrls = []

  $(".portItemSchedule tr").each((i, item) => {
    // Ignore the table heading
    if (i > 0) {
      // Port Name Associated values
      const port_name = portName
      const portLat = port + "_PORT_LATITUDE"
      const portLng = port + "_PORT_LONGITUDE"
      const portUnLocode = port + "_PORT_UN_LOCODE"

      var sentence_case_port = port
        .split(" ")
        .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(" ")

      // Port UN Locode
      const port_un_locode = process.env[portUnLocode]

      // Port Coordinates
      const portcoordinateslat = process.env[portLat]
      const portcoordinateslng = process.env[portLng]

      // Name of Vessel
      const vessel_short_cruise_name = $(item).find("a").text()

      // -------------------------------------------------------
      var weekdayArray = new Array(7)
      weekdayArray[0] = "Sunday"
      weekdayArray[1] = "Monday"
      weekdayArray[2] = "Tuesday"
      weekdayArray[3] = "Wednesday"
      weekdayArray[4] = "Thursday"
      weekdayArray[5] = "Friday"
      weekdayArray[6] = "Saturday"
      // -------------------------------------------------------

      //  Date of Arrival
      let arrivalDate = $(item)
        .children("td")
        .children("span")
        .html()
        .replace(/,/, "") // Removes the comma

      // Expected Time of Arrival
      let vessel_eta_time = $(item).children("td").next("td").next("td").html()

      let vessel_eta = ""
      let weekday = ""

      // If No Arrival Time Given
      if (vessel_eta_time == "") {
        vessel_eta = "Not Known"
        vessel_eta_time = "Not Known"
        weekday = "NA"
      } else {
        vessel_eta = Date.parse(arrivalDate + " " + vessel_eta_time + " GMT")
        var d = new Date(vessel_eta)
        vessel_eta = d.toISOString()

        weekday = weekdayArray[d.getDay()]
      }

      // Expected Time of Departure
      let vessel_etd_time = $(item).children("td").last("td").html()
      let vessel_etd = ""

      // If No Departure Time Given
      if (vessel_etd_time == "") {
        vessel_etd = "Not Known"
        vessel_etd_time = "Not Known"
      } else {
        vessel_etd = Date.parse(arrivalDate + " " + vessel_etd_time + " GMT")
        var d = new Date(vessel_etd)
        vessel_etd = d.toISOString()
      }

      // Url of Cruise Line Logo image
      const cruise_line_logo_url = $(item).find("img").attr("src")

      // Name of Cruise Line
      const raw_cruise_line = $(item).find("img").attr("title")
      const cruise_line = raw_cruise_line.substr(0, raw_cruise_line.length - 20)

      // Url of Vessel Web Page
      const vessel_name_url = $(item).find("a").attr("href")
      if (
        typeof vessel_name_url === "string" ||
        vessel_name_url instanceof String
      ) {
        // it's a string
        vesselUrls.push(vessel_name_url)
      }
      // it's something else
      else console.log("Error, vessel_name_url is not a string")

      const newPortArrival = [
        process.env.DATABASE_VERSION,
        sentence_case_port,
        port_name,
        port_un_locode,
        portcoordinateslng,
        portcoordinateslat,
        cruise_line,
        cruise_line_logo_url,
        vessel_short_cruise_name,
        arrivalDate,
        weekday,
        vessel_eta,
        vessel_eta_time,
        vessel_etd,
        vessel_etd_time,
        vessel_name_url,
      ]

      // Now save in SQLite
      savePortArrival(db, newPortArrival)
    }
  })

  // Return array of vessel Urls
  return vesselUrls
}

export default savePortArrival
