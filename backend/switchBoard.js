"use strict"

import axios from "axios"

let api = "https://api.darksky.net/forecast/"
let key = "2a14ddef58529b52c0117b751e15c078"
let interval
let darkSkiesUrl = ""

// console.log("Socket id : " + socket.id, pos.lat)

// const locationMap = new Map()

const getApiAndEmit = async socket => {
  try {
    // Getting the data from DarkSky
    const res = await axios.get(
      darkSkiesUrl
      // Dark Skies Url is "https://api.darksky.net/forecast/2a14ddef58529b52c0117b751e15c078/54.659,-5.772"
    )

    // Emitting a new message. It will be consumed by the client
    socket.emit("DataFromDarkSkiesAPI", res.data.currently.temperature)

    console.log(res.data.currently.temperature)
  } catch (error) {
    console.error(`Error: ${error.code}`)
  }
}

export async function runSwitchboard(io) {
  console.log("In the switchBoard file")

  // Using socket.io for realtime
  io.on("connection", socket => {
    //  locationMap.set(socket.id, { lat: null, lng: null })
    console.log("Client Connected")

    // Fetch Position Data
    socket.on("fetchLocation", pos => {
      // if (locationMap.has(socket.id)) {
      //   locationMap.set(socket.id, pos)

      darkSkiesUrl = api += key + "/" + pos.lat + "," + pos.lng

      socket.emit("transmitPosition", pos)
      // }
    })

    if (interval) {
      clearInterval(interval)
    }

    interval = setInterval(async () => {
      getApiAndEmit(socket)
    }, 10000)

    socket.on("Client Disconnected", () => {
      //    locationMap.delete(socket.id)
      console.log("Disconnected")
    })
  })
}
