import React, { memo } from "react"
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

function RouteSelectionPanel(props) {
  return (
    <div>
      <RouteSelectionPanelTitleContainer>
        <Title>Available Bus Routes</Title>
      </RouteSelectionPanelTitleContainer>
      <RouteSelectionPanelListContainer>
        {props.busRoutesCollection
          ? props.busRoutesCollection.map((busRoute) => (
              <RouteSelectionList
                key={busRoute.route_id}
                routeVisible={true}
                routeColor={busRoute.route_color}
                routeNumber={busRoute.route_short_name}
                routeName={busRoute.route_long_name}
                routeVia={busRoute.route_short_name}
              />
            ))
          : null}
      </RouteSelectionPanelListContainer>
    </div>
  )
}

export default memo(RouteSelectionPanel)
