"use strict"
import axios from "axios"
import { HomeTemperature } from "./models/weatherModels/v1/rtTemperature"

export const getDarkSkiesData = async () => {
  // Dark Skies Url is "https://api.darksky.net/forecast/2a14ddef58529b52c0117b751e15c078/54.659,-5.772"

  try {
    let darkSkiesUrl =
      process.env.REACT_APP_DARK_SKY_URL +
      process.env.REACT_APP_DARK_SKY_WEATHER_API +
      "/" +
      process.env.REACT_APP_HOME_LATITUDE +
      "," +
      process.env.REACT_APP_HOME_LONGITUDE

    // fetch data from a url endpoint
    const response = await axios.get(darkSkiesUrl)

    return response
  } catch (error) {
    // handle error
    console.log("Error in getApiAndEmit: ", error)
  }
}

// Function to emit weather data to be consumed by the client
export const emitDarkSkiesData = async (socket, darkSkiesData) => {
  socket.emit("DataFromDarkSkiesAPI", {
    Time: darkSkiesData.data.currently.time,
    Temperature: darkSkiesData.data.currently.temperature,
  })
}

// Function to save weather data to mongodb
export const saveDarkSkiesDataToDatabase = async (socket, darkSkiesData) => {
  // console.log(
  //   "In the saveDarkSkiesToDatabase function: " +
  //     darkSkiesData.data.currently.temperature
  // )

  return darkSkiesData.data.currently.temperature
}
