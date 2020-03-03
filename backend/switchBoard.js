"use strict"

import axios from "axios"

let api = "https://api.darksky.net/forecast/"
let key = "2a14ddef58529b52c0117b751e15c078"

// const locationMap = new Map()

// const getApiAndEmit = async socket => {
//   try {
//     // Getting the data from DarkSky
//     const res = await axios.get(
//       "https://api.darksky.net/forecast/2a14ddef58529b52c0117b751e15c078/54.659,-5.772"
//     )

//     socket.emit("DataFromDarkSkiesAPI", res.data.currently.temperature)
//     // Emitting a new message. It will be consumed by the client
//   } catch (error) {
//     console.error(`Error: ${error.code}`)
//   }
// }

let interval

export async function runSwitchboard(io) {
  console.log("In the switchBoard file")

  // Using socket.io for realtime
  io.on("connection", socket => {
    //  locationMap.set(socket.id, { lat: null, lng: null })
    console.log("Client Connected")

    if (interval) {
      clearInterval(interval)
    }

    interval = setInterval(async () => {
      // getApiAndEmit(socket)
      try {
        // Getting the data from DarkSky
        const res = await axios.get(
          "https://api.darksky.net/forecast/2a14ddef58529b52c0117b751e15c078/54.659,-5.772"
        )

        socket.emit("DataFromDarkSkiesAPI", res.data.currently.temperature)
        // Emitting a new message. It will be consumed by the client
      } catch (error) {
        console.error(`Error: ${error.code}`)
      }
    }, 10000)

    // Fetch Position Data
    socket.on("fetchLocation", pos => {
      // if (locationMap.has(socket.id)) {
      //   locationMap.set(socket.id, pos)
      console.log("Socket id : " + socket.id, pos.lat)
      api += key + "/" + pos.lat + "," + pos.lng

      socket.emit("transmitPosition", pos)
      // }
    })

    socket.on("Client Disconnected", () => {
      //    locationMap.delete(socket.id)
      console.log("Disconnected")
    })
  })
}
