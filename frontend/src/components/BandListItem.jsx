import React, { useState } from "react"
import axios from "axios"
import { makeStyles, ListItem } from "@material-ui/core"
import BandButton from "./BandButton"
import BandCheckbox from "./BandCheckbox"
import BandListItemText from "./BandListItemText"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "360px",
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    padding: "0px",
  },
}))

export async function selectedUniqueRoute(selectedBusRouteNumber, selected) {
  console.log("Bus Route to change: ", selectedBusRouteNumber)

  await axios({
    url: "http://localhost:5000/api/transport/groutes/:routenumber",
    data: {
      routeNumber: selectedBusRouteNumber,
      routeVisible: selected,
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
      selectedUniqueRoute(routeNumber, false)
    } else {
      setRouteVisibleCheckbox(true)
      selectedUniqueRoute(routeNumber, true)
    }
  }

  console.log(props.routeColor)

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
      <BandListItemText routeName={props.routeName} />
    </ListItem>
  )
}
