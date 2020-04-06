import React from "react"
import socketIOClient from "socket.io-client"
import { useEffect, useState } from "react"
import { LineChart, Line, XAxis, YAxis } from "recharts"

const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)

const Weather1 = () => {
  const [data, setData] = useState([])

  // Listen for weather data and update the state
  useEffect(() => {
    socket.on("DataFromDarkSkiesAPI", (data) => {
      setData((currentData) => [...currentData, data])
    })
  }, [])

  let uniqueValues = [...new Set(data.map((item) => item.value))]

  return (
    <div>
      {data ? (
        <h3>
          The temperature now at Home is:
          {uniqueValues[uniqueValues.length - 1]} °F
        </h3>
      ) : (
        <h3>Loading...</h3>
      )}
      <LineChart width={500} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Line dataKey="value" />
      </LineChart>
    </div>
  )
}

export default Weather1
