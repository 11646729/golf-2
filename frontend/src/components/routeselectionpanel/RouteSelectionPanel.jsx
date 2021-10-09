import React from "react"

import Title from "../title/Title"
import RouteSelectionList from "../RouteSelectionList"

import "./routeselectionpanel.css"

export default function RouteSelectionPanel(props) {
  return (
    <div>
      <div className="routeselectionpaneltitlecontainer">
        <Title>Available Bus Routes</Title>
      </div>
      <div className="routeselectionpanellistcontainer">
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
      </div>
    </div>
  )
}
