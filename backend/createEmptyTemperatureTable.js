import sqlite3 from "sqlite3"
import { openSqlDbConnection, closeSqlDbConnection } from "./fileUtilities"

// -------------------------------------------------------
// Create Temperatures Table in the SQLite Database
// Path: Function called in switchBoard
// -------------------------------------------------------
export const createEmptyTemperatureTable = async () => {
  try {
    let db = null

    db = await openSqlDbConnection(process.env.SQL_URI)

    if (db !== null) {
      // Firstly create an empty Table in the database - IF NEEDED
      const temperatures_create =
        "CREATE TABLE IF NOT EXISTS Temperatures (temperatureId INTEGER PRIMARY KEY AUTOINCREMENT, databaseVersion INTEGER, timeOfMeasurement VARCHAR(100) NOT NULL, locationName VARCHAR(100) NOT NULL, locationTemperature REAL, locationLng REAL CHECK( locationLng >= -180 AND locationLng <= 180 ), locationLat REAL CHECK( locationLat >= -90 AND locationLat <= 90 ))"
      await db.exec(temperatures_create)

      console.log("Temperature Table successfully created")
    }

    // Disconnect from the SQLite database
    closeSqlDbConnection(db)
  } catch (e) {
    return console.error(e.message)
  }
}
