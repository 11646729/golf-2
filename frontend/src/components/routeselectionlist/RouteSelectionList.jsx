import React, { memo } from "react"
import BandListItem from "../BandListItem"

import "./routeselectionlist.css"

function RouteSelectionList(props) {
  return (
    <div className="routeselectionlistcontainer">
      <BandListItem
        routeVisible={props.routeVisible}
        routeColor={props.routeColor}
        routeNumber={props.routeNumber}
        routeName={props.routeName}
        routeVia={props.routeVia}
      />
    </div>
  )
}

export default memo(RouteSelectionList)
