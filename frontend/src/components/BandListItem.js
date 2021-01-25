import React, { useState } from "react"
import { makeStyles, ListItem } from "@material-ui/core"
import BandButton from "./BandButton"
import BandCheckbox from "./BandCheckbox"
import BandListItemText from "./BandListItemText"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    padding: 0,
  },
}))

export function selectedRoutesAdd(selectedBusRouteNumber) {
  console.log("Bus Route to add: ", selectedBusRouteNumber)
}

export function selectedRoutesRemove(selectedBusRouteNumber) {
  console.log("Bus Route to remove: ", selectedBusRouteNumber)
}

export default function BandListItem(props) {
  const classes = useStyles(props)

  const [routeDisplayCheckbox, setRouteDisplayCheckbox] = useState(false)

  const handleListItemClick = (event, busRouteNumber) => {
    if (routeDisplayCheckbox === true) {
      setRouteDisplayCheckbox(false)
      selectedRoutesRemove(busRouteNumber)
    } else {
      setRouteDisplayCheckbox(true)
      selectedRoutesAdd(busRouteNumber)
    }
  }

  return (
    <ListItem
      button
      classes={{ root: classes.item }}
      onClick={(event) => handleListItemClick(event, props.busRouteNumber)}
    >
      <BandCheckbox checked={props.busRouteVisible} />
      <BandButton
        busRouteColor={props.busRouteColor}
        busRouteNumber={props.busRouteNumber}
      />
      <BandListItemText
        busRouteName={props.busRouteName}
        busRouteVia={props.busRouteVia}
      />
    </ListItem>
  )
}
