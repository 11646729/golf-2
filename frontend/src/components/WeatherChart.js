import React, { useState, useEffect, Fragment } from "react"
import moment from "moment"
import socketIOClient from "socket.io-client"
import {
  useTheme,
  Paper,
  Grid,
  CssBaseline,
  Container,
  Button,
  makeStyles,
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
import get20WeatherDataPoints from "./getWeatherData"

const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)

const useStyles = makeStyles({
  paper: {
    height: 600,
    margingTop: 50,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 100,
  },
})

export const WeatherChart = () => {
  const classes = useStyles()

  // -----------------------------------------------------
  // DATA HOOKS SECTION
  // -----------------------------------------------------
  const [temperatureValues, setTemperatureValues] = useState([])
  const [errorLoading, setLoadingError] = useState([])

  const fetchRTTemperatureData = (temperatureValues) => {
    socket.on("DataFromDarkSkiesAPI", (currentData) => {
      // Need to cancel the Promise here to stop errors
      setTemperatureValues((temperatureValues) => [
        ...temperatureValues,
        currentData.temperature,
      ])
    })
    // Only display data for the last 20 values
    temperatureValues.splice(0, temperatureValues.length - 20)
  }

  // This line initialises the data array
  // NB Reset useEffect() with a closure to fix error
  useEffect(() => {
    let isSubscribed = true

    get20WeatherDataPoints()
      .then((temperatureValues) =>
        isSubscribed ? setTemperatureValues(temperatureValues) : null
      )
      .catch((errorLoading) =>
        isSubscribed ? setLoadingError(errorLoading) : null
      )

    return () => (isSubscribed = false)
  }, [])

  // Listen for realtime weather data and update the state
  if (temperatureValues.length > 0) {
    fetchRTTemperatureData(temperatureValues)
  }

  // -----------------------------------------------------
  // EVENT HANDLERS SECTION
  // -----------------------------------------------------
  const theme = useTheme()

  const clearDataArray = () => {
    // Error here
    setTemperatureValues((temperatureValues) => [])
  }

  const formatXAxis = (tickItem) => {
    return moment.unix(tickItem).format("HH:mm MMM Do")
  }

  const formatYAxis = (tickItem) => {
    return +tickItem.toFixed(2)
  }

  // -----------------------------------------------------
  // VIEW SECTION
  // -----------------------------------------------------
  return (
    <Fragment>
      <Paper className={classes.paper}>
        <CssBaseline />
        <Grid container>
          <Container maxWidth="xl">
            <Grid item xs={12} sm={12} style={{ marginTop: 50, width: "100%" }}>
              {temperatureValues.length < 1 ? (
                <Title>Home Temperature is loading...</Title>
              ) : (
                <Title>
                  Home Temperature is: &nbsp;
                  {Object.values(temperatureValues[0])[4]} °F
                </Title>
              )}
              {!errorLoading ? (
                <LoadingTitle>Error Loading...</LoadingTitle>
              ) : null}
              <Button size="small" color="primary" onClick={clearDataArray}>
                Clear
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              style={{ marginTop: 20, width: "100%", height: 400 }}
            >
              <ResponsiveContainer>
                <LineChart data={temperatureValues}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    stroke={theme.palette.text.secondary}
                    dataKey="timeOfMeasurement"
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
                    dataKey="locationTemperature"
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
                    dataKey="locationTemperature"
                    stroke={theme.palette.primary.main}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Grid>
          </Container>
        </Grid>
      </Paper>
    </Fragment>
  )
}

export default WeatherChart
