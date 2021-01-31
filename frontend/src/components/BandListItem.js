import React, { useState } from "react"
import axios from "axios"
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

export async function selectedUniqueRoutesAdd(selectedBusRouteNumber) {
  console.log("Bus Route to add: ", selectedBusRouteNumber)

  // let res =
  await axios({
    url: "http://localhost:5000/api/gtfsTransport/uniqueReducedRoutes",
    data: {
      routeNumber: selectedBusRouteNumber,
      routeVisible: true,
    },
    method: "PUT",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export async function selectedUniqueRoutesRemove(selectedBusRouteNumber) {
  console.log("Bus Route to remove: ", selectedBusRouteNumber)

  // let res =
  await axios({
    url: "http://localhost:5000/api/gtfsTransport/uniqueReducedRoutes",
    data: {
      routeNumber: selectedBusRouteNumber,
      routeVisible: false,
    },
    method: "PUT",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })
}

export default function BandListItem(props) {
  const classes = useStyles(props)

  const [routeVisibleCheckbox, setRouteVisibleCheckbox] = useState(
    props.routeVisible
  )

  const handleListItemClick = (event, routeNumber) => {
    // These if choices refer to checkbox state before changes
    if (routeVisibleCheckbox === true) {
      setRouteVisibleCheckbox(false)
      selectedUniqueRoutesRemove(routeNumber)
    } else {
      setRouteVisibleCheckbox(true)
      selectedUniqueRoutesAdd(routeNumber)
    }
  }

  return (
    <ListItem
      button
      classes={{ root: classes.item }}
      onClick={(event) => handleListItemClick(event, props.routeNumber)}
    >
      <BandCheckbox checked={routeVisibleCheckbox} />
      <BandButton
        routeColor={props.routeColor}
        routeNumber={props.routeNumber}
      />
      <BandListItemText routeName={props.routeName} routeVia={props.routeVia} />
    </ListItem>
  )
}
