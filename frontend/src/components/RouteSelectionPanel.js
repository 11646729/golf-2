import React from "react"
import { Paper, makeStyles } from "@material-ui/core"
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

  // Sort the busRoutesCollection array by increasing busRouteNumber
  let sortedBusRoutesCollection = props.busRoutesCollection
  sortedBusRoutesCollection.sort((a, b) =>
    a.routeNumber > b.routeNumber ? 1 : -1
  )

  return (
    <Paper className={classes.routeSelectionList}>
      <LoadingTitle> Local Routes</LoadingTitle>
      {sortedBusRoutesCollection
        ? sortedBusRoutesCollection.map((busRoute) => (
            <RouteSelectionList
              key={busRoute.stopKey}
              routeVisible={busRoute.routeVisible}
              routeColor={busRoute.routeColor}
              routeNumber={busRoute.routeNumber}
              routeName={busRoute.routeLongName}
              routeVia={busRoute.routeNumber}
            />
          ))
        : null}
    </Paper>
  )
}
