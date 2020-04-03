//import React from "react"
import { usePosition } from "use-position"
import { useEffect } from "react"
import socketIOClient from "socket.io-client"

const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)

export const BrowserPosition = () => {
  const { latitude, longitude, error } = usePosition(true)

  useEffect(() => {
    if (latitude && longitude && !error) {
      socket.emit("fetchLocation", { latitude, longitude })

      // console.log(latitude, longitude)
    }
  })

  return null
}

export default BrowserPosition
