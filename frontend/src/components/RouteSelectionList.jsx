import React, { memo } from "react"
import styled from "styled-components"

import BandListItem from "./BandListItem"

const RouteSelectionListContainer = styled.div`
  width: "100%";
  max-width: 360px;
`

function RouteSelectionList(props) {
  return (
    <RouteSelectionListContainer>
      <BandListItem
        routeVisible={props.routeVisible}
        routeColor={props.routeColor}
        routeNumber={props.routeNumber}
        routeName={props.routeName}
        routeVia={props.routeVia}
      />
    </RouteSelectionListContainer>
  )
}

export default memo(RouteSelectionList)
