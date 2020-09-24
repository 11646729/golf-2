import React, { useState, useEffect, Fragment } from "react"
import axios from "axios"
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

const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)

const useStyles = makeStyles({
  paper: {
    // width: "100%",
    height: 600,
    margingTop: 50,
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 100,
  },
  container: {
    marginTop: 50,
    maxHeight: 440,
  },
})

export const WeatherChart = () => {
  const classes = useStyles()

  // -----------------------------------------------------
  // DATA HOOKS SECTION
  // -----------------------------------------------------
  const [initialDataLoaded, setInitialData] = useState(false)
  const [temperatureValues, setTemperatureValues] = useState([])
  const [errorLoading, setLoadingError] = useState([])

  const fetchRTTemperatureData = (temperatureValues) => {
    socket.on("DataFromDarkSkiesAPI", (currentData) => {
      setTemperatureValues((temperatureValues) => [
        ...temperatureValues,
        currentData.temperature,
      ])
    })
    // Only display data for the last 20 values
    temperatureValues.splice(0, temperatureValues.length - 20)
  }

  // This line initialises the data array
  useEffect(() => {
    let url = "http://localhost:5000/api/weather/temperatureReadings"

    const fetchData = async () => {
      try {
        setLoadingError({})
        const result = await axios(url)

        // Only display data for the last 20 values
        result.data.splice(0, result.data.length - 20)

        setTemperatureValues(result.data)
        setInitialData(true)
      } catch (err) {
        setLoadingError(err)
      }
    }
    fetchData()
  }, [])

  // Listen for realtime weather data and update the state
  if (initialDataLoaded) {
    // console.log("Temperature array length: " + temperatureValues.length)
    fetchRTTemperatureData(temperatureValues)
  }

  // -----------------------------------------------------
  // EVENT HANDLERS SECTION
  // -----------------------------------------------------
  const theme = useTheme()

  const clearDataArray = () => {
    // Error here
    setTemperatureValues((temperatureValues) => [])
    // setTemperatureValues([])
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
