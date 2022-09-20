import React, { memo } from "react"
import PropTypes from "prop-types"
import "./cruisestable.css"
import styled from "styled-components"

import Title from "../Title"

const CruisesTableContainer = styled.div`
  min-width: 200px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
`

const CruisesTableTitleContainer = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const CruisesTable = (props) => {
  const { cruisesTableTitle, data } = props

  CruisesTable.propTypes = {
    cruisesTableTitle: PropTypes.string,
    data: PropTypes.object,
  }

  const Button = ({ type }) => (
    <button className={`widgetLgButton ${type}`}>{type}</button>
  )

  return (
    <div className="widgetLg">
      <CruisesTableTitleContainer>
        <Title>{cruisesTableTitle}</Title>
      </CruisesTableTitleContainer>
      <CruisesTableContainer>
        <table className="cruisestable">
          <thead>
            <tr className="widgetLgTh">
              <th>Day</th>
              <th>Ship</th>
              <th>Arrival</th>
              <th>Departure</th>
              <th>Itinerary</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr className="widgetLgTr" key={row.portarrivalid}>
                <td className="widgetLgDay">
                  <div className="widgetLgDate">{row.arrivalDate}</div>
                  <div className="widgetLgDayOfWeek">{row.weekday}</div>
                </td>
                <td className="widgetLgShip">
                  <img
                    className="widgetLgShipImage"
                    src={row.cruiselinelogo}
                    alt="Cruise Line Logo"
                  />
                  <div className="widgetLgShipName">
                    {row.vesselshortcruisename}
                  </div>
                </td>
                <td className="widgetLgArrivalTime">{row.vesseletatime}</td>
                <td className="widgetLgDepartureTime">{row.vesseletdtime}</td>
                <td className="widgetLgItinerary">
                  <Button type="Show" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CruisesTableContainer>
    </div>
  )
}

export default memo(CruisesTable)
