import React, { useEffect, useState } from "react"
import axios from "axios"
// import { Link } from "react-router-dom"
import Button from "@material-ui/core/Button"
import moment from "moment"
import socketIOClient from "socket.io-client"
import { useTheme } from "@material-ui/core/styles"
import {
  CartesianGrid,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import Title from "./Title"

const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)

export const formatXAxis = (tickItem) => {
  return moment.unix(tickItem).format("HH:mm MMM Do")
}

export const formatYAxis = (tickItem) => {
  return +tickItem.toFixed(2)
}

export const WeatherChart = () => {
  const theme = useTheme()
  const [data, setData] = useState([])

  // This line clears the data array
  useEffect(() => {
    socket.on("clearDataFromDarkSkiesAPI", () => {
      setData((data) => [])
    })
  })

  // // This line initializes the data array from the database
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/api/weather/temperatureReadings")
  //     .then((resp) => {
  //       setData((data) => [...data, resp.data[0]])
  //       console.log(resp.data[0])
  //       console.log(data.length)
  //     })
  // })

  // Listen for realtime weather data and update the state
  useEffect(() => {
    socket.on("DataFromDarkSkiesAPI", (currentData) => {
      setData((data) => [...data, currentData.temperature])
    })
  }, [])

  console.log(data[0])

  return (
    <div style={{ width: "100%", height: 300 }}>
      {data.length < 1 ? (
        <Title>Home Temperature is loading...</Title>
      ) : (
        <Title>
          Home Temperature is: &nbsp;
          {Object.values(data[0])[4]} °F
        </Title>
      )}
      <Button size="small" color="primary">
        Clear
      </Button>
      <ResponsiveContainer>
        <LineChart
          data={data}
          padding={{
            top: 0,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            stroke={theme.palette.text.secondary}
            dataKey="timeOfMeasurement"
            tickFormatter={formatXAxis}
          >
            <Label
              position="insideBottom"
              offset={-3}
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Time &amp; Date
            </Label>
          </XAxis>
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            dataKey="locationTemperature"
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
          <Line
            type="monotone"
            dataKey="locationTemperature"
            stroke={theme.palette.primary.main}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default WeatherChart
