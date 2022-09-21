import React, { memo } from "react"
import PropTypes from "prop-types"
import "./cruisestable.css"
import styled from "styled-components"

import Title from "../Title"

const CruisesTableTitleContainer = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const CruisesTableContainer = styled.div`
  min-width: 200px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
`

const CruisesTableStyle = styled.table`
  width: 94%;
  margin-left: 20px;
  margin-right: 20px;
  border-spacing: 20px;
  border: 1px solid lightgray;
  border-collapse: collapse;
  font-size: 13px;

  /* table.cruisestable tr:hover {
    background-color: #ebeccd;
  } */

  &:tr:hover {
    background-color: #ebeccd;
    color: white;
    cursor: pointer;
  }
`

const CruiseShip = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const CruiseLineLogo = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin-right: 5px;
`

const CruiseShipName = styled.div`
  text-decoration: underline;
  color: blue;
`

const CruiseShipArrivalTime = styled.div``

const DateOfArrival = styled.div`
  // font-weight: 600;
  text-align: center;
`

const DayOfTheWeek = styled.div`
  font-weight: 600;
  text-align: center;
`

const ArrivalTime = styled.div`
  text-align: center;
`

const DepartureTime = styled.div`
  text-align: center;
`

const Button = styled.button`
  padding: 5px 7px;
  border: none;
  border-radius: 10px;
  background-color: lightgreen;
  color: darkgreen;
  margin: auto;
  display: block;

  &:hover {
    background-color: #105b72c2;
    color: white;
    cursor: pointer;
  }
`

const CruisesTable = (props) => {
  const { cruisesTableTitle, data } = props

  CruisesTable.propTypes = {
    cruisesTableTitle: PropTypes.string,
    data: PropTypes.array,
  }

  return (
    <div className="widgetLg">
      <CruisesTableTitleContainer>
        <Title>{cruisesTableTitle}</Title>
      </CruisesTableTitleContainer>
      <CruisesTableContainer>
        <table className="cruisestable">
          {/* <CruisesTableStyle> */}
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
                <td>
                  <CruiseShipArrivalTime>
                    <DateOfArrival>{row.arrivalDate}</DateOfArrival>
                    <DayOfTheWeek>{row.weekday}</DayOfTheWeek>
                  </CruiseShipArrivalTime>
                </td>
                <td>
                  <CruiseShip>
                    <CruiseLineLogo
                      src={row.cruiselinelogo}
                      alt="Cruise Line Logo"
                    />
                    <CruiseShipName>{row.vesselshortcruisename}</CruiseShipName>
                  </CruiseShip>
                </td>
                <td>
                  <ArrivalTime>{row.vesseletatime}</ArrivalTime>
                </td>
                <td>
                  <DepartureTime>{row.vesseletdtime}</DepartureTime>
                </td>
                <td>
                  <Button>Show</Button>
                </td>
              </tr>
            ))}
          </tbody>
          {/* </CruisesTableStyle> */}
        </table>
      </CruisesTableContainer>
    </div>
  )
}

export default memo(CruisesTable)
