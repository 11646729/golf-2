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
  Legend,
  ResponsiveContainer,
} from "recharts"
import Title from "./Title"

const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)

export default function WeatherChart() {
  const theme = useTheme()
  const [data, setData] = useState([])

  // Listen for weather data and update the state
  useEffect(() => {
    socket.on("DataFromDarkSkiesAPI", (data) => {
      setData((currentData) => [...currentData, data])
    })
  }, [])

  let uniqueValues = [...new Set(data.map((item) => item.value))]

  return (
    <React.Fragment>
      {/* <ResponsiveContainer width="95%" height={400}> */}
      <Title>Realtime Temperature</Title>
      {data.length < 1 ? (
        <h3>Loading...</h3>
      ) : (
        <h3>
          The temperature now at Home is:
          {uniqueValues[uniqueValues.length - 1]} °F
        </h3>
      )}
      <LineChart data={data} width={900} height={300}>
        <XAxis dataKey="Time" stroke={theme.palette.text.secondary} />
        <YAxis stroke={theme.palette.text.secondary}>
          <Label
            angle={270}
            position="center"
            style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
          >
            Temperature &deg;F
          </Label>
        </YAxis>
        <Legend />
        <Line
          type="monotone"
          dataKey="Temperature"
          stroke={theme.palette.primary.main}
        />
      </LineChart>
      {/* </ResponsiveContainer> */}
    </React.Fragment>
  )
}
