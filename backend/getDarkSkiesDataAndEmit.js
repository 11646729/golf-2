"use strict"
import axios from "axios"
import { HomeTemperature } from "./models/weatherModels/v1/rtTemperature"

export const getDarkSkiesDataAndEmit = async (socket) => {
  // Dark Skies Url is "https://api.darksky.net/forecast/2a14ddef58529b52c0117b751e15c078/54.659,-5.772"

  try {
    let darkSkiesUrl =
      process.env.REACT_APP_DARK_SKY_URL +
      process.env.REACT_APP_DARK_SKY_WEATHER_API +
      "/54.659,-5.772"

    // fetch data from a url endpoint
    const response = await axios.get(darkSkiesUrl)

    // handle success - Emitting a new message to be consumed by the client
    socket.emit("DataFromDarkSkiesAPI", {
      Time: response.data.currently.time,
      Temperature: response.data.currently.temperature,
    })

    return response.data.currently.temperature
  } catch (error) {
    // handle error
    console.log("Error in getApiAndEmit: ", error)
  }
}

// Function to save weather data to mongodb
export async function saveWeatherInDatabase(response) {
  //  console.log(response.data.currently.temperature)

  return true
}
