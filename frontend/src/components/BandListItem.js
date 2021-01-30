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

export async function selectedRoutesAdd(selectedBusRouteNumber) {
  console.log("Bus Route to add: ", selectedBusRouteNumber)

  let res = await axios({
    url: "http://localhost:5000/api/gtfsTransport/reducedRoutes",
    data: {
      busRouteNumber: selectedBusRouteNumber,
      routeVisible: true,
    },
    method: "PUT",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  console.log(res)
}

export async function selectedRoutesRemove(selectedBusRouteNumber) {
  console.log("Bus Route to remove: ", selectedBusRouteNumber)

  let res = await axios({
    url: "http://localhost:5000/api/gtfsTransport/reducedRoutes",
    data: {
      busRouteNumber: selectedBusRouteNumber,
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
