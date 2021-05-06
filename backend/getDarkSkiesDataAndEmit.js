import axios from "axios"
import { openSqlDbConnection, closeSqlDbConnection } from "./fileUtilities"

// -------------------------------------------------------
// Fetch weather data from the Dark Skies website
// Path:
// -------------------------------------------------------
export const getAndSaveDarkSkiesData = async () => {
  try {
    // build Dark Skies Url
    let darkSkiesUrl =
      process.env.DARK_SKY_URL +
      process.env.DARK_SKY_WEATHER_API_KEY +
      "/" +
      process.env.HOME_LATITUDE +
      "," +
      process.env.HOME_LONGITUDE

    // fetch data from the url endpoint and return it
    const data = await axios.get(darkSkiesUrl)

    // Reformat data into Transient object
    const temperatureReading = [
      process.env.DATABASE_VERSION,
      data.data.currently.time,
      "Home",
      data.data.currently.temperature,
      process.env.HOME_LATITUDE,
      process.env.HOME_LONGITUDE,
    ]

    // call local save data function
    saveDarkSkiesData(temperatureReading)

    // TODO - change data to temperatureReading
    return temperatureReading
    // return data
  } catch (err) {
    console.log("Error in getAndSaveDarkSkiesData: ", err)
  }
}

// -------------------------------------------------------
// Save Temperature Reading to SQLite database
// Path:
// -------------------------------------------------------
export const saveDarkSkiesData = (temperatureReading) => {
  // Guard clause for null temperatureReading
  if (temperatureReading == null) return

  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      // Count the records in the database
      let sql = "SELECT COUNT(temperatureId) AS count FROM Temperatures"
      db.get(sql, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }
        console.log("Record Count Before: ", results.count)
      })

      // Insert the new temperatureReading object
      const sql_insert =
        "INSERT INTO Temperatures (databaseVersion, timeOfMeasurement, locationName, locationTemperature, locationLng, locationLat) VALUES ($1, $2, $3, $4, $5, $6 )"
      db.run(sql_insert, temperatureReading, function (err) {
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
// Socket Emit weather data to be consumed by the client
// Path:
// -------------------------------------------------------
export const emitDarkSkiesData = async (socket, darkSkiesData) => {
  // Guard clauses
  if (socket == null) return
  if (darkSkiesData == null) return

  try {
    await socket.emit("DataFromDarkSkiesAPI", darkSkiesData)
  } catch (err) {
    console.log("Error in emitDarkSkiesData: ", err)
  }
}
