import React from "react"
import { Paper, makeStyles } from "@material-ui/core"
import LoadingTitle from "./LoadingTitle"
import RouteSelectionList from "./RouteSelectionList"
import PanelRadioButtons from "./PanelRadioButtons"

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

  return (
    <Paper className={classes.routeSelectionList}>
      <LoadingTitle> Available Bus Routes</LoadingTitle>
      <PanelRadioButtons
        busRoutesSelectedAgency={props.busRoutesSelectedAgency}
      />

      {props.sortedUniqueBusRoutesCollection
        ? props.sortedUniqueBusRoutesCollection.map((busRoute) => (
            <RouteSelectionList
              key={busRoute.routeKey}
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
