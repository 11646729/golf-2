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
// Get all Temperature Readings
// Path: localhost:5000/api/weather/temperatures
// -------------------------------------------------------
export const getAllTemperatureReadings = (req, res) => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      let sql = "SELECT * FROM Temperatures ORDER BY temperatureId"
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
// Delete all Temperature Readings from SQLite database
// Path:
// -------------------------------------------------------
export const deleteAllTemperatureReadings = (req, res) => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      const sql_insert = "DELETE FROM Temperatures"
      db.all(sql_insert, function (err) {
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
