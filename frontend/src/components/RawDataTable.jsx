import React, { memo, useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

import Title from "./Title"
import StatusButton from "./StatusButton"

import { loadTemperaturesDataHandler } from "../functionHandlers/loadTemperaturesDataHandler"
import { loadGolfCoursesDataHandler } from "../functionHandlers/loadGolfCoursesDataHandler"
import { loadCruiseShipArrivalsDataHandler } from "../functionHandlers/loadCruiseShipArrivalsDataHandler"
import { loadBusTransportDataHandler } from "../functionHandlers/loadBusTransportDataHandler"
import { loadCrimesDataHandler } from "../functionHandlers/loadCrimesDataHandler"
import { startRealtimeDataHandler } from "../functionHandlers/startRealtimeDataHandler"

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

const RawDataTable = (props) => {
  const { rawDataTableTitle, onShow } = props

  RawDataTable.propTypes = {
    rawDataTableTitle: PropTypes.string,
    onShow: PropTypes.func.isRequired,
  }

  const [isActiveStatus1, setIsActiveStatus1] = useState(1)

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
                <StatusButton
                  bgcolor="lightgreen"
                  text="Fetch Temperatures"
                  // onShow={() => loadTemperaturesDataHandler()}
                  onShow={() => setIsActiveStatus1(!isActiveStatus1)}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Golf Course Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>Ready</RawDataTableDataCell>
              <RawDataTableDataCell>
                <StatusButton
                  bgcolor="lightgreen"
                  text="Fetch Golf Courses"
                  // onShow={() => loadGolfCoursesDataHandler()}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Cruise Ship Arrivals Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>Ready</RawDataTableDataCell>
              <RawDataTableDataCell>
                <StatusButton
                  bgcolor="lightgreen"
                  text="Fetch Cruise Ships"
                  // onShow={() => loadCruiseShipArrivalsDataHandler()}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Bus Transport Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>Ready</RawDataTableDataCell>
              <RawDataTableDataCell>
                <StatusButton
                  bgcolor="lightgreen"
                  text="Fetch Bus Data"
                  // onShow={() => loadBusTransportDataHandler()}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>Crime Data</RawDataTableDataCellLeft>
              <RawDataTableDataCell>Ready</RawDataTableDataCell>
              <RawDataTableDataCell>
                <StatusButton
                  bgcolor="lightgreen"
                  text="Fetch Crime Data"
                  // onShow={() => loadCrimesDataHandler()}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>Realtime Data</RawDataTableDataCellLeft>
              <RawDataTableDataCell>Currently: Off</RawDataTableDataCell>
              <RawDataTableDataCell>
                <StatusButton
                  bgcolor="lightgreen"
                  text="Start Realtime Data"
                  onShow={() => startRealtimeDataHandler()}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
          </RawDataTableBodyStyle>
        </RawDataTableStyle>
      </RawDataTableContainer>
    </div>
  )
}

export default memo(RawDataTable)
