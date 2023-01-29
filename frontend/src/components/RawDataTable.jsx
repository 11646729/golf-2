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

const RawDataTableHeader = styled.thead`
  /* text-align: left; */
  font-size: 14px;
`

const RawDataTableRow = styled.tr`
  &:hover {
    background-color: #ebeccd;
  }
`

const RawDataTableHead = styled.th`
  height: 34px;
  margin: 0;
  padding: 0.5rem;
  border-bottom: 1px solid lightgray;
  border-right: 1px solid lightgray;
`

const RawDataTableBody = styled.tbody``

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

  const btnState1 = 1
  const messageArray = ["Ready", "Button Pressed", "Working", "Ended"]

  // const [btnState1, setBtnState1] = useState(0)

  const [isActiveStatus1, setIsActiveStatus1] = useState(false)
  const [isActiveStatus2, setIsActiveStatus2] = useState(false)
  const [isActiveStatus3, setIsActiveStatus3] = useState(false)
  const [isActiveStatus4, setIsActiveStatus4] = useState(false)
  const [isActiveStatus5, setIsActiveStatus5] = useState(false)
  const [isActiveStatus6, setIsActiveStatus6] = useState(false)

  // const [statusMessage1, setStatusMessage1] = useState(messageArray[btnState1])

  const [statusMessage1, setStatusMessage1] = useState("Waiting")
  const [statusMessage2, setStatusMessage2] = useState("Waiting")
  const [statusMessage3, setStatusMessage3] = useState("Waiting")
  const [statusMessage4, setStatusMessage4] = useState("Waiting")
  const [statusMessage5, setStatusMessage5] = useState("Waiting")
  const [statusMessage6, setStatusMessage6] = useState("Waiting")

  // console.log(btnState1)

  return (
    <div>
      <RawDataTableTitleContainer>
        <Title>{rawDataTableTitle}</Title>
      </RawDataTableTitleContainer>

      <RawDataTableContainer>
        <RawDataTableStyle>
          <RawDataTableHeader>
            <RawDataTableRow>
              <RawDataTableHead>Import Raw Data Types</RawDataTableHead>
              <RawDataTableHead>Status</RawDataTableHead>
              <RawDataTableHead>Actions</RawDataTableHead>
            </RawDataTableRow>
          </RawDataTableHeader>
          <RawDataTableBody>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Temperatures Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>
                {/* {messageArray[btnState1]} */}
                {statusMessage1}
              </RawDataTableDataCell>
              <RawDataTableDataCell>
                <StatusButton
                  stateText="Fetch Temperatures"
                  status={isActiveStatus1}
                  onShow={() => {
                    setIsActiveStatus1(!isActiveStatus1)
                    statusMessage1 === "Waiting"
                      ? setStatusMessage1("Button Pressed")
                      : setStatusMessage1("Waiting")
                    // loadTemperaturesDataHandler()
                  }}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Golf Course Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>{statusMessage2}</RawDataTableDataCell>
              <RawDataTableDataCell>
                <StatusButton
                  stateText="Fetch Golf Courses"
                  status={isActiveStatus2}
                  onShow={() => {
                    setIsActiveStatus2(!isActiveStatus2)
                    statusMessage2 === "Waiting"
                      ? setStatusMessage2("Button Pressed")
                      : setStatusMessage2("Waiting")
                    // loadGolfCoursesDataHandler()
                  }}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Cruise Ship Arrivals Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>{statusMessage3}</RawDataTableDataCell>
              <RawDataTableDataCell>
                <StatusButton
                  stateText="Fetch Cruise Ships"
                  status={isActiveStatus3}
                  onShow={() => {
                    setIsActiveStatus3(!isActiveStatus3)
                    statusMessage3 === "Waiting"
                      ? setStatusMessage3("Button Pressed")
                      : setStatusMessage3("Waiting")
                    // loadCruiseShipArrivalsDataHandler()
                  }}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>
                Bus Transport Data
              </RawDataTableDataCellLeft>
              <RawDataTableDataCell>{statusMessage4}</RawDataTableDataCell>
              <RawDataTableDataCell>
                <StatusButton
                  stateText="Fetch Bus Data"
                  status={isActiveStatus4}
                  onShow={() => {
                    setIsActiveStatus4(!isActiveStatus4)
                    statusMessage4 === "Waiting"
                      ? setStatusMessage4("Button Pressed")
                      : setStatusMessage4("Waiting")
                    // loadBusTransportDataHandler()
                  }}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>Crime Data</RawDataTableDataCellLeft>
              <RawDataTableDataCell>{statusMessage5}</RawDataTableDataCell>
              <RawDataTableDataCell>
                <StatusButton
                  stateText="Fetch Crime Data"
                  status={isActiveStatus5}
                  onShow={() => {
                    setIsActiveStatus5(!isActiveStatus5)
                    statusMessage5 === "Waiting"
                      ? setStatusMessage5("Button Pressed")
                      : setStatusMessage5("Waiting")
                    // loadCrimesDataHandler()
                  }}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
            <RawDataTableRow>
              <RawDataTableDataCellLeft>Realtime Data</RawDataTableDataCellLeft>
              <RawDataTableDataCell>{statusMessage6}</RawDataTableDataCell>
              <RawDataTableDataCell>
                <StatusButton
                  stateText="Start Realtime Data"
                  status={isActiveStatus6}
                  onShow={() => {
                    setIsActiveStatus6(!isActiveStatus6)
                    statusMessage6 === "Waiting"
                      ? setStatusMessage6("Button Pressed")
                      : setStatusMessage6("Waiting")
                    // startRealtimeDataHandler()
                  }}
                />
              </RawDataTableDataCell>
            </RawDataTableRow>
          </RawDataTableBody>
        </RawDataTableStyle>
      </RawDataTableContainer>
    </div>
  )
}

export default memo(RawDataTable)
