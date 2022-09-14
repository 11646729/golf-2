import React, { useState, memo } from "react"
import { ListItem } from "@material-ui/core"
import BandButton from "./BandButton"
import BandCheckbox from "./BandCheckbox"
import BandListItemText from "./BandListItemText"
import { selectedUniqueRoute } from "../functionHandlers/loadBusTransportDataHandler"

import styled from "styled-components"

const BandListItemContainer = styled.div`
  width: 100%;
  max-width: 360px;
`
const BandListContainer = styled.div`
  padding: 0px;
`

const BandListItem = (props) => {
  const [routeVisibleCheckbox, setRouteVisibleCheckbox] = useState(
    props.routeVisible
  )

  const handleListItemClick = (event, routeNumber) => {
    // These if choices refer to checkbox state before changes
    if (routeVisibleCheckbox === true) {
      setRouteVisibleCheckbox(false)
      selectedUniqueRoute(
        "http://localhost:4000/api/bus/groutes/:routenumber",
        routeNumber,
        false
      )
    } else {
      setRouteVisibleCheckbox(true)
      selectedUniqueRoute(
        "http://localhost:4000/api/bus/groutes/:routenumber",
        routeNumber,
        true
      )
    }
  }

  return (
    <BandListContainer>
      <BandListItemContainer>
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
      </BandListItemContainer>
    </BandListContainer>
  )
}

export default memo(BandListItem)
