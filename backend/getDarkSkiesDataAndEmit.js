"use strict"

import axios from "axios"
import { HomeTemperature } from "./models/weatherModels/v1/rtTemperature"

// Function to fetch weather data from the Dark Skies website
export const fetchDarkSkiesData = async () => {
  try {
    let darkSkiesUrl =
      process.env.DARK_SKY_URL +
      process.env.DARK_SKY_WEATHER_API_KEY +
      "/" +
      process.env.HOME_LATITUDE +
      "," +
      process.env.HOME_LONGITUDE

    // fetch data from the url endpoint
    const response = await axios.get(darkSkiesUrl)

    return response
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

// Function to save weather data to mongodb
export const saveDarkSkiesDataToDatabase = async (darkSkiesData) => {
  try {
    console.log(
      "In the saveDarkSkiesToDatabase function: " +
        darkSkiesData.data.currently.temperature
    )

    // return darkSkiesData.data.currently.temperature
  } catch (error) {
    // handle error
    console.log("Error in saveDarkSkiesDataToDatabase: ", error)
  }
}
