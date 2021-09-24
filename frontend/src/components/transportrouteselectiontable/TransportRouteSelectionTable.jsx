import React, { memo } from "react"
import "./transportrouteselectiontable.css"

import Title from "../title/Title"

function TransportRouteSelectionTable(props) {
  return (
    <div className="routetablecontainer">
      <div className="routetablecontainertitle">
        <Title>{props.routesTableTitle}</Title>
        {/* {props.loadingError ? (
          <LoadingTitle>Error Loading...</LoadingTitle>
        ) : null} */}
      </div>
      <div className="routetable">route selection</div>
    </div>
  )
}

export default memo(TransportRouteSelectionTable)
