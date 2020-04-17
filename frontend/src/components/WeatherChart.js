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
  // Legend,
  Tooltip,
  // ResponsiveContainer,
} from "recharts"
import Title from "./Title"

const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)

export const formatXAxis = (tickItem) => {
  return moment.unix(tickItem).format("HH:mm MMM Do")
}

export const formatYAxis = (tickItem) => {
  return +tickItem.toFixed(1)
}

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
      <Title>Realtime Temperature at Home</Title>
      {data.length < 1 ? (
        <h3>Loading...</h3>
      ) : (
        <h3>
          The temperature now at home is: &nbsp;
          {Object.values(data[0])[1]} °F
        </h3>
      )}
      <LineChart data={data} width={900} height={300}>
        <XAxis
          stroke={theme.palette.text.secondary}
          dataKey="Time"
          tickFormatter={formatXAxis}
        >
          <Label
            position="insideBottom"
            offset={-5}
            style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
          >
            Time and Date
          </Label>
        </XAxis>
        />
        <YAxis
          stroke={theme.palette.text.secondary}
          dataKey="Temperature"
          tickFormatter={formatYAxis}
          type="number"
          domain={["dataMin", "dataMax"]}
        >
          <Label
            angle={270}
            position="left"
            offset={-10}
            style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
          >
            Temperature &deg;F
          </Label>
        </YAxis>
        <Tooltip labelFormatter={formatXAxis} />
        {/* <Legend /> */}
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
