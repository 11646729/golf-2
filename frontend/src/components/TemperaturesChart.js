import React, { useState, useEffect } from "react"
import moment from "moment"
// import socketIOClient from "socket.io-client"
import {
  useTheme,
  Paper,
  Grid,
  CssBaseline,
  Container,
  // Button,
} from "@material-ui/core"
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
import LoadingTitle from "./LoadingTitle"
import getData from "./Utilities"

// const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)

export default function TemperaturesChart() {
  // -----------------------------------------------------
  // DATA HOOKS SECTION
  // -----------------------------------------------------
  const [temperatureData, setTemperatureData] = useState([])
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getData("http://localhost:5000/api/weather/temperatureReadings")
      .then((returnedData) =>
        isSubscribed ? setTemperatureData(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  // Now delete all except the last 20 readings
  temperatureData.splice(0, temperatureData.length - 20)

  // const fetchRTTemperatureData = (temperatures) => {
  //   socket.on("DataFromDarkSkiesAPI", (currentData) => {
  //     // Need to cancel the Promise here to stop errors
  //     setTemperatureData((temps) => [...temps, currentData.temperature])
  //   })
  //   // Only display data for the last 20 values
  //   // temperatureValues.splice(0, temperatureValues.length - 20)
  // }

  // Listen for realtime temperature data and update the state
  // if (temperatureData.length > 0) {
  //   fetchRTTemperatureData(temperatureData)
  // }

  // const clearDataArray = () => {
  //   // Error here
  //   setTemperatureData(() => [])
  // }

  return (
    <TemperaturesChartView
      temperatureData={temperatureData}
      loadingError={loadingError}
    />
  )
}

// -------------------------------------------------------
// React View component
// -------------------------------------------------------
function TemperaturesChartView(props) {
  const theme = useTheme()
  const formatXAxis = (tickItem) => moment.unix(tickItem).format("HH:mm MMM Do")
  const formatYAxis = (tickItem) => +tickItem.toFixed(2)

  return (
    <div>
      <Paper
        style={{
          height: 600,
          margingTop: 50,
          marginLeft: 40,
          marginRight: 40,
          marginBottom: 100,
        }}
      >
        <CssBaseline />
        <Grid container>
          <Container maxWidth="xl">
            <Grid item xs={12} sm={12} style={{ marginTop: 50, width: "100%" }}>
              {props.temperatureData.length < 1 ? (
                <Title>Home Temperature is loading...</Title>
              ) : (
                <Title>
                  Home Temperature is: &nbsp;
                  {Object.values(props.temperatureData[0])[4]} °F
                </Title>
              )}
              {props.loadingError ? (
                <LoadingTitle>Error Loading...</LoadingTitle>
              ) : null}
              {/* <Button size="small" color="primary" onClick={clearDataArray}>
                Clear
              </Button> */}
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              style={{ marginTop: 20, width: "100%", height: 400 }}
            >
              <ResponsiveContainer>
                <LineChart data={props.temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    stroke={theme.palette.text.secondary}
                    dataKey="timeofmeasurement"
                    tickFormatter={formatXAxis}
                  >
                    <Label
                      position="insideBottom"
                      offset={-5}
                      style={{
                        textAnchor: "middle",
                        fill: theme.palette.text.primary,
                      }}
                    >
                      Time &amp; Date
                    </Label>
                  </XAxis>
                  <YAxis
                    stroke={theme.palette.text.secondary}
                    dataKey="locationtemperature"
                    tickFormatter={formatYAxis}
                    type="number"
                    domain={["dataMin", "dataMax"]}
                  >
                    <Label
                      angle={270}
                      position="left"
                      offset={-1}
                      style={{
                        textAnchor: "middle",
                        fill: theme.palette.text.primary,
                      }}
                    >
                      Temperature &deg;F
                    </Label>
                  </YAxis>
                  <Tooltip labelFormatter={formatXAxis} />
                  <Line
                    type="monotone"
                    dataKey="locationtemperature"
                    stroke={theme.palette.primary.main}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
          </Container>
        </Grid>
      </Paper>
    </div>
  )
}
