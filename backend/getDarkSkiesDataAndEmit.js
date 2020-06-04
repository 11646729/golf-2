"use strict"

import axios from "axios"
import { TemperatureSchema } from "./models/weatherModels/v1/temperatureSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"
import { directCreate as createTemperatureReading } from "./controllers/weatherControllers/v1/weatherController"

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
    console.log("Error in fetchDarkSkiesData: ", err)
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

// Function to save weather data to mongodb
const saveDarkSkiesData = async (darkSkiesData) => {
  try {
    // Database version
    const database_version = process.env.DATABASE_VERSION

    const location_name = "Home"

    // Home Coordinates in GeoJSON
    const location_coords = new CoordsSchema({
      lat: process.env.HOME_LATITUDE,
      lng: process.env.HOME_LONGITUDE,
    })

    const location_temperature = darkSkiesData.data.currently.temperature

    // // Now create a model instance
    const temperature = new TemperatureSchema({
      databaseVersion: database_version,
      timeOfMeasurement: darkSkiesData.data.currently.time,
      locationName: location_name,
      locationCoordinates: location_coords,
      locationTemperature: location_temperature,
    })

    // Now save data in database
    createTemperatureReading(temperature)
  } catch (err) {
    console.log("Error in saveDarkSkiesDataToDatabase: ", err)
  }
}
