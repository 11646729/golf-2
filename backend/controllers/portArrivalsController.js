import { openSqlDbConnection, closeSqlDbConnection } from "../fileUtilities.js"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/cruise/
// -------------------------------------------------------
export var index = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Create Port Arrivals Table in the SQLite Database
// Path: Function called in switchBoard
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
// Save Port Arrivals details to SQLite database
// Path:
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
    db.get(sql1, [], (err, results) => {
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
// Delete all Port Arrivals from SQLite database
// Path:
// -------------------------------------------------------
export const deleteAllPortArrivals = (db) => {
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
  } catch (err) {
    console.error("Error in deleteAllPortArrivals: ", err)
  }
}

// -------------------------------------------------------
// Delete all Port Arrivals from SQLite database
// Path:
// -------------------------------------------------------
export const dropPortArrivalsTable = (db) => {
  // Guard clause for null Database Connection
  if (db === null) return

  try {
    const vessels_drop = "DROP TABLE IF EXISTS portarrivals"
    db.all(vessels_drop, [], (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log("portarrivals Table successfully dropped")
    })
  } catch (err) {
    console.error("Error in dropPortArrivalsTable: ", err)
  }
}

// -------------------------------------------------------
// Get all Port Arrivals from SQLite database
// Path: localhost:5000/api/cruise/portArrivals
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

export default savePortArrival
