"use strict"
import axios from "axios"

export const getDarkSkiesDataAndEmit = async (socket) => {
  // Dark Skies Url is "https://api.darksky.net/forecast/2a14ddef58529b52c0117b751e15c078/54.659,-5.772"

  let darkSkiesUrl =
    process.env.REACT_APP_DARK_SKY_URL +
    process.env.REACT_APP_DARK_SKY_WEATHER_API +
    "/54.659,-5.772"

  // Getting the data from DarkSky
  await axios
    .get(darkSkiesUrl)
    .then(function (response) {
      // handle success - Emitting a new message to be consumed by the client
      socket.emit("DataFromDarkSkiesAPI", {
        time: response.data.currently.time,
        value: response.data.currently.temperature,
      })
      // console.log(response.data.currently.time)
    })
    .catch(function (error) {
      // handle error
      console.log("Error in getApiAndEmit: ", error)
    })
    .finally(function () {
      // always executed
      console.log("In Finally option in getApiAndEmit")
    })
}
