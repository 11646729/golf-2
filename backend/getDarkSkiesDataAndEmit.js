"use strict"

import axios from "axios"
import moment from "moment"
import { HomeTemperatureSchema } from "./models/weatherModels/v1/rtTemperatureSchema"
import { CoordsSchema } from "./models/commonModels/coordsSchema"

// Function to fetch weather data from the Dark Skies website
export const getDarkSkiesData = async () => {
  try {
    let darkSkiesUrl =
      process.env.DARK_SKY_URL +
      process.env.DARK_SKY_WEATHER_API_KEY +
      "/" +
      process.env.HOME_LATITUDE +
      "," +
      process.env.HOME_LONGITUDE

    // fetch data from the url endpoint and return it
    return await axios.get(darkSkiesUrl)
  } catch (error) {
    // handle error
    console.log("Error in fetchDarkSkiesData: ", error)
  }
}

// Function to emit weather data to be consumed by the client
export const emitDarkSkiesData = async (socket, darkSkiesData) => {
  try {
    await socket.emit("DataFromDarkSkiesAPI", {
      Time: darkSkiesData.data.currently.time,
      Temperature: darkSkiesData.data.currently.temperature,
    })
  } catch (error) {
    // handle error
    console.log("Error in emitDarkSkiesData: ", error)
  }
}

// Function to clear weather data array on the client
export const clearDarkSkiesData = async (socket) => {
  try {
    await socket.emit("clearDataFromDarkSkiesAPI")
    console.log("In the clearDarkSkiesData function")
  } catch (error) {
    // handle error
    console.log("Error in clearDataFromDarkSkiesAPI: ", error)
  }
}

// Function to save weather data to mongodb
export const saveDarkSkiesDataToDatabase = async (darkSkiesData) => {
  try {
    // Database version
    const database_version = process.env.DATABASE_VERSION

    // Converted From UNIX Time
    const time_of_measurement = moment
      .unix(darkSkiesData.data.currently.time)
      .format()

    const location_name = "Home"

    // Home Coordinates in GeoJSON
    const location_coords = new CoordsSchema({
      lat: process.env.HOME_LATITUDE,
      lng: process.env.HOME_LONGITUDE,
    })

    const location_temperature = darkSkiesData.data.currently.temperature

    // // Now create a model instance
    const homeTemperature = new HomeTemperatureSchema({
      databaseVersion: database_version,
      timeOfMeasurement: time_of_measurement,
      locationName: location_name,
      locationCoordinates: location_coords,
      locationTemperature: location_temperature,
    })

    // Now save in mongoDB
    homeTemperature
      .save()
      // .then(() => console.log("Temperature Measurement saved"))
      .catch((err) => console.log("Error: " + err))
  } catch (error) {
    // handle error
    console.log("Error in saveDarkSkiesDataToDatabase: ", error)
  }
}
