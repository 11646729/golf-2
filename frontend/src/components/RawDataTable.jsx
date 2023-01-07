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
  const { rawDataTableTitle } = props

  RawDataTable.propTypes = {
    rawDataTableTitle: PropTypes.string,
  }

  const [isActiveStatus1, setIsActiveStatus1] = useState(false)
  const [isActiveStatus2, setIsActiveStatus2] = useState(false)
  const [isActiveStatus3, setIsActiveStatus3] = useState(false)
  const [isActiveStatus4, setIsActiveStatus4] = useState(false)
  const [isActiveStatus5, setIsActiveStatus5] = useState(false)
  const [isActiveStatus6, setIsActiveStatus6] = useState(false)

  console.log(isActiveStatus1)

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
              <RawDataTableHeader>Select</RawDataTableHeader>
            </RawDataTableRow>
          </RawDataTableHeaderStyle>
          <RawDataTableBodyStyle>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Temperatures Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>
                <StatusButton
                  bgcolor="salmon"
                  text="Fetch Temperatures"
                  status={isActiveStatus1}
                  onShow={() => {
                    setIsActiveStatus1(!isActiveStatus1)
                    // loadTemperaturesDataHandler()
                  }}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Golf Course Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>
                <StatusButton
                  bgcolor="lightgreen"
                  text="Fetch Golf Courses"
                  status={isActiveStatus2}
                  onShow={() => {
                    setIsActiveStatus2(!isActiveStatus2)
                    // loadGolfCoursesDataHandler()
                  }}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Cruise Ship Arrivals Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>
                <StatusButton
                  bgcolor="lightgreen"
                  text="Fetch Cruise Ships"
                  status={isActiveStatus3}
                  onShow={() => {
                    setIsActiveStatus3(!isActiveStatus3)
                    // loadCruiseShipArrivalsDataHandler()
                  }}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Bus Transport Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>
                <StatusButton
                  bgcolor="lightgreen"
                  text="Fetch Bus Data"
                  status={isActiveStatus4}
                  onShow={() => {
                    setIsActiveStatus4(!isActiveStatus4)
                    // loadBusTransportDataHandler()
                  }}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>Crime Data</RawDataTableDataCellLeft>
              <RawDataTableDataCell>
                <StatusButton
                  bgcolor="lightgreen"
                  text="Fetch Crime Data"
                  status={isActiveStatus5}
                  onShow={() => {
                    setIsActiveStatus5(!isActiveStatus5)
                    // loadCrimesDataHandler()
                  }}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>Realtime Data</RawDataTableDataCellLeft>
              <RawDataTableDataCell>
                <StatusButton
                  bgcolor="lightgreen"
                  text="Start Realtime Data"
                  status={isActiveStatus6}
                  onShow={() => {
                    setIsActiveStatus6(!isActiveStatus6)
                    // startRealtimeDataHandler()
                  }}
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
