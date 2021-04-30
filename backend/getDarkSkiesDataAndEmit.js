import axios from "axios"
import { TemperatureSchema } from "./models/weatherModels/v1/temperatureSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
import {
  openSqlDbConnection,
  closeSqlDbConnection,
  countRecords,
} from "./fileUtilities"
import sqlite3 from "sqlite3"

// Function to fetch weather data from the Dark Skies website
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

    // call local save data function
    saveDarkSkiesData(data)

    return data
  } catch (err) {
    console.log("Error in getAndSaveDarkSkiesData: ", err)
  }
}

// Function to emit weather data to be consumed by the client
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
export const saveDarkSkiesData = async (darkSkiesData) => {
  if (darkSkiesData == null) return

  try {
    let db = null
    db = openSqlDbConnection(process.env.SQL_URI)

    let sql = "SELECT COUNT(temperatureId) AS count FROM Temperatures"

    if (db !== null) {
      countRecords(db, sql)

      const temperatureReading = [
        process.env.DATABASE_VERSION,
        darkSkiesData.data.currently.time,
        "Home",
        darkSkiesData.data.currently.temperature,
        process.env.HOME_LATITUDE,
        process.env.HOME_LONGITUDE,
      ]

      const sql_insert =
        "INSERT INTO Temperatures (databaseVersion, timeOfMeasurement, locationName, locationTemperature, locationLng, locationLat) VALUES ($1, $2, $3, $4, $5, $6 )"

      db.run(sql_insert, temperatureReading, (err, results) => {
        if (err) {
          return console.error(err.message)
        }
        console.log("New Temperature Reading saved")
      })

      countRecords(db, sql)

      closeSqlDbConnection(db)
    }
  } catch (err) {
    console.log("Error in saveDarkSkiesData: ", err)
  }
}
