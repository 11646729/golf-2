import React, { useState, memo } from "react"
import axios from "axios"
import { ListItem } from "@material-ui/core"
import BandButton from "../BandButton"
import BandCheckbox from "../bandcheckbox/BandCheckbox"
import BandListItemText from "../BandListItemText"

import "./bandlistitem.css"

export async function selectedUniqueRoute(selectedBusRouteNumber, selected) {
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

function BandListItem(props) {
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

  return (
    <div className="bandlistitemcontainer">
      <div className="listitemcontainer">
        <ListItem
          button
          onClick={(event) => handleListItemClick(event, props.routeNumber)}
        >
          <div className="bandcheckboxcontainer">
            <BandCheckbox checked={routeVisibleCheckbox} />
          </div>
          <div className="bandbuttoncontainer">
            <BandButton
              routeColor={props.routeColor}
              routeNumber={props.routeNumber}
            />
          </div>
          <div className="bandlistitemtextcontainer">
            <BandListItemText routeName={props.routeName} />
          </div>
        </ListItem>
      </div>
    </div>
  )
}

export default memo(BandListItem)
