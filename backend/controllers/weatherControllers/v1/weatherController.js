import {
  openSqlDbConnection,
  closeSqlDbConnection,
} from "../../../fileUtilities"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/weather/
// -------------------------------------------------------
export function index(req, res) {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Create Temperatures Table in the SQLite Database
// Path: Function called in switchBoard
// -------------------------------------------------------
export const createEmptyTemperatureTable = async () => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      const sql =
        "CREATE TABLE IF NOT EXISTS temperatures (temperatureid INTEGER PRIMARY KEY AUTOINCREMENT, databaseversion INTEGER, timeofmeasurement VARCHAR(100) NOT NULL, locationname VARCHAR(100) NOT NULL, locationtemperature REAL, locationlng REAL CHECK( locationlng >= -180 AND locationlng <= 180 ), locationlat REAL CHECK( locationlat >= -90 AND locationlat <= 90 ))"
      db.all(sql, [], (err) => {
        if (err) {
          return console.error(err.message)
        }
        console.log("Temperature Table successfully created")
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
// Get all Temperature Readings
// Path: localhost:5000/api/weather/temperatures
// -------------------------------------------------------
export const getAllTemperatureReadings = (req, res) => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      const sql = "SELECT * FROM temperatures ORDER BY temperatureid"
      db.all(sql, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }
        // console.log("Record Count Before: ", results.count)
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
// Save Temperature Reading to SQLite database
// Path:
// -------------------------------------------------------
export const saveTemperatureReadings = (temperatureReading) => {
  // Guard clause for null temperatureReading
  if (temperatureReading == null) return

  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      // Count the records in the database
      let sql = "SELECT COUNT(temperatureid) AS count FROM temperatures"
      // Must be get to work - db.all doesn't work
      db.get(sql, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }
        console.log("Record Count Before: ", results.count)
      })

      // Don't change the routine below
      const sql1 =
        "INSERT INTO temperatures (databaseversion, timeofmeasurement, locationname, locationtemperature, locationlng, locationlat) VALUES ($1, $2, $3, $4, $5, $6)"
      db.run(sql1, temperatureReading, function (err) {
        if (err) {
          return console.error(err.message)
        }
        console.warn("New Temperature Reading inserted id:", this.lastID)
      })

      // Close the Database Connection
      closeSqlDbConnection(db)
    } catch (err) {
      console.error("Error in saveDarkSkiesData: ", err)
    }
  } else {
    console.error("Cannot connect to database")
  }
}

// -------------------------------------------------------
// Delete all Temperature Readings from SQLite database
// Path:
// -------------------------------------------------------
export const deleteAllTemperatureReadings = () => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      const sql_insert = "DELETE FROM temperatures"
      db.all(sql_insert, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }
        console.warn("All Temperature Readings deleted")
      })

      // Close the Database Connection
      closeSqlDbConnection(db)
    } catch (err) {
      console.error("Error in deleteAllTemperatureReadings: ", err)
    }
  } else {
    console.error("Cannot connect to database")
  }
}
