import React from "react"
import socketIOClient from "socket.io-client"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis } from "recharts"
import BrowserPosition from "./BrowserPosition"

const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)

const Weather1 = ({}) => {
  const [data, setData] = useState([])

  BrowserPosition()

  // Listen for weather data and update the state
  useEffect(() => {
    socket.on("DataFromDarkSkiesAPI", data => {
      setData(currentData => [...currentData, data])
    })
  }, [])

  return (
    <div>
      {/* <div style={{ textAlign: "center" }}>
        //{" "}
        {data ? (
          <p>The temperature in Seahill is: {data.temperature} °F</p>
        ) : (
          <p>Loading...</p>
        )}
      </div> */}
      <h3>The temperature in Seahill is: {data.value} °F</h3>
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </div>
  )
}

export default Weather1
