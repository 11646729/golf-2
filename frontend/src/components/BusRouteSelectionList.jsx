import React, { memo } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import BandListItem from "./BandListItem"

const RouteSelectionListContainer = styled.div`
  width: "100%";
  max-width: 360px;
`

const RouteSelectionList = (props) => {
  const { routeVisible, routeColor, routeNumber, routeName, routeVia } = props

  RouteSelectionList.propTypes = {
    routeVisible: PropTypes.bool,
    routeColor: PropTypes.string,
    routeNumber: PropTypes.number,
    routeName: PropTypes.string,
    routeVia: PropTypes.string,
  }

  return (
    <RouteSelectionListContainer>
      <BandListItem
        routeVisible={routeVisible}
        routeColor={routeColor}
        routeNumber={routeNumber}
        routeName={routeName}
        routeVia={routeVia}
      />
    </RouteSelectionListContainer>
  )
}

export default memo(RouteSelectionList)
