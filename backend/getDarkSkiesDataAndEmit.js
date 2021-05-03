import axios from "axios"
import { TemperatureSchema } from "./models/weatherModels/v1/temperatureSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
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
    return data
  } catch (err) {
    console.log("Error in getAndSaveDarkSkiesData: ", err)
  }
}

// -------------------------------------------------------
// Socket Emit weather data to be consumed by the client
// Path:
// -------------------------------------------------------
export const emitDarkSkiesData = async (socket, darkSkiesData) => {
  try {
    // Database version
    const database_version = process.env.DATABASE_VERSION

    const location_name = "Home"

    // Home Coordinates in GeoJSON
    const location_coords = new CoordsSchema({
      lat: process.env.HOME_LATITUDE,
      lng: process.env.HOME_LONGITUDE,
    })

    // // Now create a model instance
    const temperature = new TemperatureSchema({
      databaseVersion: database_version,
      timeOfMeasurement: darkSkiesData.data.currently.time,
      locationName: location_name,
      locationCoordinates: location_coords,
      locationTemperature: darkSkiesData.data.currently.temperature,
    })

    await socket.emit("DataFromDarkSkiesAPI", {
      temperature,
    })
  } catch (err) {
    console.log("Error in emitDarkSkiesData: ", err)
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
