import React, { memo } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Title from "./Title"

import { loadGolfCoursesDataHandler } from "../functionHandlers/loadGolfCoursesDataHandler"
import { loadCruiseShipArrivalsDataHandler } from "../functionHandlers/loadCruiseShipArrivalsDataHandler"
import { loadBusTransportDataHandler } from "../functionHandlers/loadBusTransportDataHandler"
import { loadCrimesDataHandler } from "../functionHandlers/loadCrimesDataHandler"
import { startRealtimeDataHandler } from "../functionHandlers/startRealtimeDataHandler"
import { loadTemperaturesDataHandler } from "../functionHandlers/loadTemperaturesDataHandler"

const RawDataTableTitleContainer = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const RawDataTableContainer = styled.div`
  min-width: 200px;
  margin-left: 20px;
  margin-right: 10px;
  margin-bottom: 20px;
`

const RawDataTableStyle = styled.table`
  width: 94%;
  margin-left: 20px;
  margin-right: 20px;
  border-spacing: 20px;
  border: 1px solid lightgray;
  border-collapse: collapse;
  font-size: 13px;
`

const RawDataTableHeaderStyle = styled.thead`
  /* text-align: left; */
  font-size: 14px;
`

const RawDataTableRow = styled.tr`
  &:hover {
    background-color: #ebeccd;
  }
`

const RawDataTableHeader = styled.th`
  height: 34px;
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
`

const RawDataTableBodyStyle = styled.tbody``

const RawDataTableDataCellLeft = styled.td`
  height: 34px;
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
  text-align: left;
`

const RawDataTableDataCell = styled.td`
  height: 34px;
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
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

const RawDataTable = (props) => {
  const { rawDataTableTitle } = props

  RawDataTable.propTypes = {
    rawDataTableTitle: PropTypes.string,
  }

  return (
    <div>
      <RawDataTableTitleContainer>
        <Title>{rawDataTableTitle}</Title>
      </RawDataTableTitleContainer>

      <RawDataTableContainer>
        <RawDataTableStyle>
          <RawDataTableHeaderStyle>
            <RawDataTableRow>
              <RawDataTableHeader>Import Raw Data Types</RawDataTableHeader>
              <RawDataTableHeader>Status</RawDataTableHeader>
              <RawDataTableHeader>Select</RawDataTableHeader>
            </RawDataTableRow>
          </RawDataTableHeaderStyle>
          <RawDataTableBodyStyle>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Temperatures Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>Ready</RawDataTableDataCell>
              <RawDataTableDataCell>
                <Button onClick={loadTemperaturesDataHandler}>Fetch</Button>
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Golf Course Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>Ready</RawDataTableDataCell>
              <RawDataTableDataCell>
                <Button onClick={loadGolfCoursesDataHandler}>Fetch</Button>
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Cruise Ship Arrivals Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>Ready</RawDataTableDataCell>
              <RawDataTableDataCell>
                <Button onClick={loadCruiseShipArrivalsDataHandler}>
                  Fetch
                </Button>
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Bus Transport Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>Ready</RawDataTableDataCell>
              <RawDataTableDataCell>
                <Button onClick={loadBusTransportDataHandler}>Fetch</Button>
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>Crime Data</RawDataTableDataCellLeft>
              <RawDataTableDataCell>Ready</RawDataTableDataCell>
              <RawDataTableDataCell>
                <Button onClick={loadCrimesDataHandler}>Fetch</Button>
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>Realtime Data</RawDataTableDataCellLeft>
              <RawDataTableDataCell>Currently: Off</RawDataTableDataCell>
              <RawDataTableDataCell>
                <Button onClick={startRealtimeDataHandler}>Fetch</Button>
              </RawDataTableDataCell>
            </RawDataTableRow>
          </RawDataTableBodyStyle>
        </RawDataTableStyle>
      </RawDataTableContainer>
    </div>
  )
}

export default memo(RawDataTable)
