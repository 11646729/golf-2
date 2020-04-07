import React from "react"
import socketIOClient from "socket.io-client"
import { useEffect, useState } from "react"
import { useTheme } from "@material-ui/core/styles"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
} from "recharts"
import Title from "./Title"

const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)

const WeatherChart = () => {
  const theme = useTheme()

  const [data, setData] = useState([])

  // Listen for weather data and update the state
  useEffect(() => {
    socket.on("DataFromDarkSkiesAPI", (data) => {
      setData((currentData) => [...currentData, data])
    })
  }, [])

  let uniqueValues = [...new Set(data.map((item) => item.value))]
  console.log(data)

  return (
    <React.Fragment>
      {/* <ResponsiveContainer> */}
      <Title>Realtime Temperature</Title>
      {data.length < 1 ? (
        <h3>Loading...</h3>
      ) : (
        <h3>
          The temperature now at Home is:
          {uniqueValues[uniqueValues.length - 1]} °F
        </h3>
      )}
      <LineChart data={data} width={400} height={300}>
        <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
        <YAxis stroke={theme.palette.text.secondary}>
          <Label
            angle={270}
            position="centre"
            style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
          >
            Temperature &deg;F
          </Label>
        </YAxis>
        <Line
          type="monotone"
          dataKey="value"
          stroke={theme.palette.primary.main}
        />
      </LineChart>
      {/* </ResponsiveContainer> */}
    </React.Fragment>
  )
}

export default WeatherChart
