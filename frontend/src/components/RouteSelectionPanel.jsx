import React, { memo } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Title from "./Title"
import RouteSelectionList from "./RouteSelectionList"

const RouteSelectionPanelTitleContainer = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const RouteSelectionPanelListContainer = styled.div`
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 50px;
  height: 600px;
  max-height: 100%;
`

const RouteSelectionPanel = (props) => {
  const { busRoutesCollection } = props

  RouteSelectionPanel.propTypes = {
    busRoutesCollection: PropTypes.array,
  }

  // Fudge
  const routeVisibleTrue = true

  return (
    <div>
      <RouteSelectionPanelTitleContainer>
        <Title>Available Bus Routes</Title>
      </RouteSelectionPanelTitleContainer>
      <RouteSelectionPanelListContainer>
        {busRoutesCollection
          ? busRoutesCollection.map((busRoute) => (
              <RouteSelectionList
                key={busRoute.routeId}
                routeVisible={routeVisibleTrue}
                routeColor={busRoute.routeColor}
                routeNumber={busRoute.routeShortName}
                routeName={busRoute.routeLongName}
                routeVia={busRoute.routeShortName}
              />
            ))
          : null}
      </RouteSelectionPanelListContainer>
    </div>
  )
}

export default memo(RouteSelectionPanel)
