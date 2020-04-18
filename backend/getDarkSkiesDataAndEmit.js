"use strict"
import axios from "axios"
import { HomeTemperature } from "./models/weatherModels/v1/rtTemperature"

export const getDarkSkiesData = async () => {
  // Dark Skies Url is "https://api.darksky.net/forecast/2a14ddef58529b52c0117b751e15c078/54.659,-5.772"

  try {
    let darkSkiesUrl =
      process.env.REACT_APP_DARK_SKY_URL +
      process.env.REACT_APP_DARK_SKY_WEATHER_API +
      "/54.659,-5.772"

    // fetch data from a url endpoint
    const response = await axios.get(darkSkiesUrl)

    return response
  } catch (error) {
    // handle error
    console.log("Error in getApiAndEmit: ", error)
  }
}

export const emitDarkSkiesData = async (socket, darkSkiesData) => {
  // handle success - Emitting a new message to be consumed by the client
  socket.emit("DataFromDarkSkiesAPI", {
    Time: darkSkiesData.data.currently.time,
    Temperature: darkSkiesData.data.currently.temperature,
  })
}

// Function to save weather data to mongodb
export const saveDarkSkiesDataToDatabase = async (socket, darkSkiesData) => {
  //  console.log(response.data.currently.temperature)
}
