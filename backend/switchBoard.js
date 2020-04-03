"use strict"
import axios from "axios"

let tick = 0
let position

export const runSwitchboard = io => {
  console.log("In the switchBoard file")

  // Using socket.io for realtime
  io.on("connection", socket => {
    console.log("Client Connected")

    // Start listening for browser position data
    socket.on("fetchLocation", pos => {
      console.log("In the fetchLocation function in the switchboard file")

      position = pos

      // Now store browser position data
      console.log("Browser position: " + position.latitude)

      // socket.emit("transmitPosition", pos)
    })

    let interval = setInterval(() => {
      getDarkSkiesApiAndEmit(socket)
      console.log("Interval Timer started")

      console.log("tick is: " + tick++)
    }, 10000)

    socket.on("disconnect", () => {
      console.log("Client Disconnected")

      if (interval) {
        clearInterval(interval)
        tick = 0
        console.log("Interval Timer stopped")
      }
    })
  })
}

const getDarkSkiesApiAndEmit = async socket => {
  // Dark Skies Url is "https://api.darksky.net/forecast/2a14ddef58529b52c0117b751e15c078/54.659,-5.772"

  console.log("Position is: " + position)

  let darkSkiesUrl =
    process.env.REACT_APP_DARK_SKY_URL +
    process.env.REACT_APP_DARK_SKY_WEATHER_API +
    "/" +
    position.latitude +
    "," +
    position.longitude

  console.log(darkSkiesUrl)

  // Getting the data from DarkSky
  await axios
    .get(darkSkiesUrl)
    .then(function(response) {
      // handle success
      // Emitting a new message to be consumed by the client
      socket.emit("DataFromDarkSkiesAPI", {
        name: tick++,
        value: response.data.currently.temperature
      })
      // console.log("Temperature is: " + res.data.currently.temperature)
      // console.log("tick is: " + tick)
      // console.log("Socket id : " + socket.id)
    })
    .catch(function(error) {
      // handle error
      console.log("Error in getApiAndEmit: ", error)
    })
    .finally(function() {
      // always executed
    })
}
