import React, { useState } from "react"
import {
  FormControlLabel,
  Checkbox,
  Paper,
  makeStyles,
} from "@material-ui/core"
import LoadingTitle from "./LoadingTitle"
import RouteSelectionList from "./RouteSelectionList"

const useStyles = makeStyles({
  routeSelectionList: {
    marginRight: 20,
    marginBottom: 50,
    height: "600px",
    square: true,
    border: "1px solid #ccc",
    maxHeight: "100%",
    overflow: "auto",
  },
})

export default function RouteSelectionPanel(props) {
  const classes = useStyles()

  // const [busStopsCheckboxSelected, setBusStopsCheckbox] = useState(false)
  const [busRoutesCheckboxSelected, setBusRoutesCheckbox] = useState(true)

  // const handleBusStopsCheckboxChange = (event) => {
  //   setBusStopsCheckbox(event.target.checked)
  // }

  const handleBusRoutesCheckboxChange = (event) => {
    setBusRoutesCheckbox(event.target.checked)
  }

  // Sort the busRoutesCollection array by increasing busRouteNumber
  let sortedBusRoutesCollection = props.busRoutesCollection
  sortedBusRoutesCollection.sort((a, b) =>
    a.busRouteNumber > b.busRouteNumber ? 1 : -1
  )

  return (
    <Paper className={classes.routeSelectionList}>
      {/* <FormControlLabel
        style={{
          marginTop: "10px",
          marginLeft: "0px",
        }}
        control={
          <Checkbox
            checked={busStopsCheckboxSelected}
            onChange={handleBusStopsCheckboxChange}
            name="busStopsCheckbox"
          />
        }
        label="Display Bus Stops"
        labelPlacement="end"
      /> */}
      {/* <FormControlLabel
        style={{
          marginTop: "10px",
          marginLeft: "0px",
        }}
        control={
          <Checkbox
            checked={busRoutesCheckboxSelected}
            onChange={handleBusRoutesCheckboxChange}
            name="busRoutesCheckbox"
          />
        }
        label="Display Bus Routes"
        labelPlacement="end"
      /> */}
      <LoadingTitle> Local Routes</LoadingTitle>
      {sortedBusRoutesCollection
        ? //  && busRoutesCheckboxSelected
          sortedBusRoutesCollection.map((busRoute) => (
            <RouteSelectionList
              key={busRoute.shapeKey}
              busRouteVisible={busRoute.busRouteVisible}
              busRouteColor={busRoute.routeColor}
              busRouteNumber={busRoute.busRouteNumber}
              busRouteName={busRoute.routeLongName}
              busRouteVia={busRoute.busRouteNumber}
            />
          ))
        : null}
    </Paper>
  )
}
