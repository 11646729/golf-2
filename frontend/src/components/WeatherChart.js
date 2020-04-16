import React from "react"
import moment from "moment"
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
    socket.on("DataFromDarkSkiesAPI", (currentData) => {
      setData((data) => [...data, currentData])
    })
  }, [])

  return (
    <React.Fragment>
      {/* <ResponsiveContainer width="95%" height={400}> */}
      <Title>Realtime Temperature</Title>
      {data.length < 1 ? (
        <h3>Loading...</h3>
      ) : (
        <h3>
          The temperature now at Home is:
          {Object.values(data[0])[1]} °F
        </h3>
      )}
      <LineChart data={data} width={900} height={300}>
        <XAxis
          stroke={theme.palette.text.secondary}
          dataKey="Time"
          tickFormatter={(unixTime) => moment(unixTime).format("mm:HH")}
          //          type="number"
        />
        <YAxis
          stroke={theme.palette.text.secondary}
          dataKey="Temperature"
          type="number"
          domain={["dataMin", "dataMax"]}
        >
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
