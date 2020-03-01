"use strict"

export async function runSwitchboard(io) {
  console.log("In the switchBoard file")

  // Using socket.io for realtime
  io.on("connection", socket => {
    //  locationMap.set(socket.id, { lat: null, lng: null })
    console.log("New Client connected")
    setInterval(() => getPositionData(socket), 2000)

    socket.on("updateLocation", pos => {
      // if (locationMap.has(socket.id)) {
      //   locationMap.set(socket.id, pos)
      console.log("Socket id : " + socket.id, pos)
      socket.emit("transmitPosition", pos)
      // }
    })

    socket.on("Client Disconnected", () => {
      //    locationMap.delete(socket.id)
      console.log("Disconnected")
    })
  })
}
