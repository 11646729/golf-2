import React from "react"
// import { useTheme } from "@material-ui/core/styles"
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Label,
//   ResponsiveContainer,
// } from "recharts"
import Title from "./Title"
import Weather from "./Weather"

export default function Chart() {
  // const theme = useTheme()

  return (
    <React.Fragment>
      {/* <Title>Realtime Temperature</Title> */}
      <Weather></Weather>
      {/* <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: "middle", fill: theme.palette.text.primary }}
            >
              Temperature &deg;C
            </Label>
          </YAxis>
          <Line
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer> */}
    </React.Fragment>
  )
}
