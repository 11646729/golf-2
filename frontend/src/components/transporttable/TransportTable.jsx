import React, { memo } from "react"
import "./transporttable.css"

import Title from "../Title"

function TransportTable(props) {
  return (
    <div className="routetablecontainer">
      <div className="routetabletitlecontainer">
        {/* <h3>{props.routesTableTitle}</h3> */}
        <Title>{props.routesTableTitle}</Title>
        {/* {props.loadingError ? (
          <LoadingTitle>Error Loading...</LoadingTitle>
        ) : null} */}
      </div>
      <div className="routetable">route selection</div>
    </div>
  )
}

export default memo(TransportTable)
