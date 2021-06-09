import { openSqlDbConnection, closeSqlDbConnection } from "../fileUtilities"

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
