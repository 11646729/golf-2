import React, { memo } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Title from "./Title"

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
`

const CruisesTableHeaderStyle = styled.thead`
  /* text-align: left; */
  font-size: 14px;
`

const TableRow = styled.tr`
  &:hover {
    background-color: #ebeccd;
  }
`

const TableHeader = styled.th`
  height: 34px;
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
`

const TableDataCell = styled.td`
  height: 34px;
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
`

const CruisesTableBodyStyle = styled.tbody``

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
  cursor: pointer;
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
    <div>
      <CruisesTableTitleContainer>
        <Title>{cruisesTableTitle}</Title>
      </CruisesTableTitleContainer>

      <CruisesTableContainer>
        <CruisesTableStyle>
          <CruisesTableHeaderStyle>
            <TableRow>
              <TableHeader>Day</TableHeader>
              <TableHeader>Ship</TableHeader>
              <TableHeader>Arrival</TableHeader>
              <TableHeader>Departure</TableHeader>
              <TableHeader>Itinerary</TableHeader>
            </TableRow>
          </CruisesTableHeaderStyle>
          <CruisesTableBodyStyle>
            {data.map((row) => (
              <TableRow key={row.portarrivalid}>
                <TableDataCell>
                  <CruiseShipArrivalTime>
                    <DateOfArrival>{row.arrivalDate}</DateOfArrival>
                    <DayOfTheWeek>{row.weekday}</DayOfTheWeek>
                  </CruiseShipArrivalTime>
                </TableDataCell>
                <TableDataCell>
                  <CruiseShip>
                    <CruiseLineLogo
                      src={row.cruiselinelogo}
                      alt="Cruise Line Logo"
                    />
                    <CruiseShipName>{row.vesselshortcruisename}</CruiseShipName>
                  </CruiseShip>
                </TableDataCell>
                <TableDataCell>
                  <ArrivalTime>{row.vesseletatime}</ArrivalTime>
                </TableDataCell>
                <TableDataCell>
                  <DepartureTime>{row.vesseletdtime}</DepartureTime>
                </TableDataCell>
                <TableDataCell>
                  <Button>Show</Button>
                </TableDataCell>
              </TableRow>
            ))}
          </CruisesTableBodyStyle>
        </CruisesTableStyle>
      </CruisesTableContainer>
    </div>
  )
}

export default memo(CruisesTable)
