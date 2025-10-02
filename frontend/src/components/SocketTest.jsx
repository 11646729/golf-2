// import React, { memo } from "react"
// import { io } from "socket.io-client"

// const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT_URL, {
//   // autoConnect: false,
// })

// const SocketTest = () => {
//   socket.on("connect", () => {
//     console.log(socket.id) // x8WIv7-mJelg7on_ALbx
//   })

//   return (
//     <div>
//       <h1>Hello World!</h1>
//     </div>
//   )
// }

// export default memo(SocketTest)

import React, { useState, useEffect } from "react"
import io from "socket.io-client"

const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT_URL, {
  // autoConnect: false,
})

const SocketTest = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [lastPong, setLastPong] = useState(null)

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true)
      console.log(socket.id) // x8WIv7-mJelg7on_ALbx
    })

    socket.on("disconnect", () => {
      setIsConnected(false)
    })

    socket.on("pong", () => {
      setLastPong(new Date().toISOString())
      console.log("Client received a pong sent by Server")
    })

    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("pong")
    }
  }, [])

  const sendPing = () => {
    socket.emit("ping")
    console.log("Client sent a ping")
  }

  return (
    <div>
      <p>Connected: {"" + isConnected}</p>
      <p>Last pong: {lastPong || "-"}</p>
      <button onClick={sendPing}>Send ping</button>
    </div>
  )
}

export default SocketTest
