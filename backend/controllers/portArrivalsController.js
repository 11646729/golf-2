import { PortArrivalSchema } from "../models/cruiseModels/v1/portArrivalSchema"
import { CoordsSchema } from "../models/commonModels/v1/coordsSchema"
import { openSqlDbConnection, closeSqlDbConnection } from "../fileUtilities"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/cruise/
// -------------------------------------------------------
export const index = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Create Port Arrivals Table in the SQLite Database
// Path: Function called in switchBoard
// -------------------------------------------------------
export const createEmptyPortArrivalsTable = async (db) => {
  // Guard clause for null Database Connection
  if (db === null) return

  try {
    const sql =
      "CREATE TABLE IF NOT EXISTS portarrivals (portarrivalid INTEGER PRIMARY KEY AUTOINCREMENT, databaseversion INTEGER, portname TEXT NOT NULL, portunlocode TEXT NOT NULL, portcoordinatelng REAL CHECK( portcoordinatelng >= -180 AND portcoordinatelng <= 180 ), portcoordinatelat REAL CHECK( portcoordinatelat >= -90 AND portcoordinatelat <= 90 ), vesselshortcruisename TEXT, vesseleta TEXT, vesseletd TEXT, vesselnameurl TEXT)"

    db.all(sql, [], (err) => {
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

  try {
    // Count the records in the database
    let sql1 = "SELECT COUNT(portarrivalid) AS count FROM portarrivals"

    // Must be get to work - db.all doesn't work
    db.get(sql1, [], (err, results) => {
      if (err) {
        return console.error(err.message)
      }
      // console.log("Record Count Before Insertion: ", results.count)
    })

    // Don't change the routine below
    const sql2 =
      "INSERT INTO portarrivals (databaseversion, portname, portunlocode, portcoordinatelng, portcoordinatelat, vesselshortcruisename, vesseleta, vesseletd, vesselnameurl) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)"

    db.run(sql2, newPortArrival, function (err) {
      if (err) {
        // console.log("Here")
        return console.error(err.message)
      }
      // console.warn("New id of inserted portarrival:", this.lastID)
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
