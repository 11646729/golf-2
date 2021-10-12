import React, { memo } from "react"
import moment from "moment"
import {
  useTheme,
  Grid,
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
import LoadingTitle from "./loadingtitle/LoadingTitle"

function TemperaturesChart(props) {
  const theme = useTheme()
  const formatXAxis = (tickItem) => moment.unix(tickItem).format("HH:mm MMM Do")
  const formatYAxis = (tickItem) => +tickItem.toFixed(2)

  return (
    <div>
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
            {/* {props.loadingError ? (
              <LoadingTitle>Error Loading...</LoadingTitle>
            ) : null} */}
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
                  tick={{ fontSize: 12 }}
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
                  tick={{ fontSize: 12 }}
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
    </div>
  )
}

export default memo(TemperaturesChart)
