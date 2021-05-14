import {
  openSqlDbConnection,
  closeSqlDbConnection,
} from "../../../fileUtilities"

// -------------------------------------------------------
// Create Vessels Table in the SQLite Database
// Path: Function called in switchBoard
// -------------------------------------------------------
export const createEmptyVesselsTable = async () => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      const sql =
        "CREATE TABLE IF NOT EXISTS vessels (vesselid INTEGER PRIMARY KEY AUTOINCREMENT, databaseversion INTEGER, vesselnameurl TEXT NOT NULL, title TEXT NOT NULL, vesseltype TEXT NOT NULL, vesselname TEXT NOT NULL, vesselflag TEXT NOT NULL, vesselshortoperator TEXT NOT NULL, vessellongoperator TEXT NOT NULL, vesselyearbuilt TEXT NOT NULL, vessellengthmetres INTEGER, vesselwidthmetres INTEGER, vesselgrosstonnage INTEGER, vesselaveragespeedknots REAL, vesselmaxspeedknots REAL, vesselaveragedraughtmetres REAL, vesselimonumber INTEGER, vesselmmsnumber INTEGER, vesselcallsign TEXT NOT NULL, vesseltypicalpassengers TEXT, vesseltypicalcrew INTEGER)"

      db.all(sql, [], (err) => {
        if (err) {
          return console.error(err.message)
        }
        console.log("vessels Table successfully created")
      })

      // Disconnect from the SQLite database
      closeSqlDbConnection(db)
    } catch (e) {
      console.error(e.message)
    }
  } else {
    console.error("Cannot connect to database")
  }
}

// -------------------------------------------------------
// Save Vessel details to SQLite database
// Path:
// -------------------------------------------------------
export const saveVessel = (newVessel) => {
  // Guard clause for null Vessel details
  if (newVessel == null) return

  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      // Count the records in the database
      let sql = "SELECT COUNT(vesselid) AS count FROM vessels"

      // Must be get to work - db.all doesn't work
      db.get(sql, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }
        // console.log("Record Count Before Insertion: ", results.count)
      })

      // Don't change the routine below
      const sql1 =
        "INSERT INTO vessels (databaseversion, vesselnameurl, title, vesseltype, vesselname, vesselflag, vesselshortoperator, vessellongoperator, vesselyearbuilt, vessellengthmetres, vesselwidthmetres, vesselgrosstonnage, vesselaveragespeedknots, vesselmaxspeedknots, vesselaveragedraughtmetres, vesselimonumber, vesselmmsnumber, vesselcallsign, vesseltypicalpassengers, vesseltypicalcrew) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)"

      db.run(sql1, newVessel, function (err) {
        if (err) {
          return console.error(err.message)
        }
        console.warn("New id of inserted vessel:", this.lastID)
      })

      // Close the Database Connection
      closeSqlDbConnection(db)
    } catch (err) {
      console.error("Error in SQLsaveVessel: ", err)
    }
  } else {
    console.error("Cannot connect to database")
  }
}

// -------------------------------------------------------
// Delete all Vessels from SQLite database
// Path:
// -------------------------------------------------------
export const deleteAllVessels = () => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      const sql_insert = "DELETE FROM vessels"
      db.all(sql_insert, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }
        console.warn("All vessels deleted")
      })

      // Reset the id number
      const sql_reset =
        "UPDATE sqlite_sequence SET seq = 0 WHERE name = 'vessels'"
      db.all(sql_reset, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }
        console.warn("Reset id number")
      })

      // Close the Database Connection
      closeSqlDbConnection(db)
    } catch (err) {
      console.error("Error in deleteAllVessels: ", err)
    }
  } else {
    console.error("Cannot connect to database")
  }
}
