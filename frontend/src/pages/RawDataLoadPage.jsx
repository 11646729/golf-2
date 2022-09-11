import React, { memo, useState } from "react"
import styled from "styled-components"
import { prepareTemperaturesTable } from "../axiosUtilities"

import { loadCruiseShipArrivalsDataHandler } from "../functionHandlers/loadCruiseShipArrivalsDataHandler.js"
import { loadGolfCourseDataHandler } from "../functionHandlers/loadGolfCourseDataHandler.js"
import { loadBusTransportDataHandler } from "../functionHandlers/loadBusTransportDataHandler.js"

const RawDataContainer = styled.div`
  display: flex;
`

const RawDataTableContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
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

const RawDataLoadPage = () => {
  const [temperaturesTableStatus, setData] = useState("")

  const prepareTemperatureDataHandler = () => {
    // Prepare temperatures table
    var showResult = true

    const result = prepareTemperaturesTable()
    setData(result)

    if (showResult) {
      if (temperaturesTableStatus !== "") {
        alert(temperaturesTableStatus)
      }
    }
  }

  const startRealtimeDataHandler = () => {
    alert("Realtime data available")
  }

  return (
    <RawDataContainer>
      <RawDataTableContainer>
        <table className="cruisestable">
          <thead>
            <tr className="rawdatatableTh">
              <th>Import Raw Data Types</th>
              <th>Status</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Temperatures Data</td>
              <td>Ready</td>
              <td>
                <Button onClick={prepareTemperatureDataHandler}>Fetch</Button>
              </td>
            </tr>
            <tr>
              <td>Golf Course Data</td>
              <td>Ready</td>
              <td>
                <Button onClick={loadGolfCourseDataHandler}>Fetch</Button>
              </td>
            </tr>
            <tr>
              <td>Cruise Ship Arrivals Data</td>
              <td>Ready</td>
              <td>
                <Button onClick={loadCruiseShipArrivalsDataHandler}>
                  Fetch
                </Button>
              </td>
            </tr>
            <tr>
              <td>GTFS Bus Transport Data</td>
              <td>Ready</td>
              <td>
                <Button onClick={loadBusTransportDataHandler}>Fetch</Button>
              </td>
            </tr>
            <tr>
              <td>Realtime Data</td>
              <td>Currently: Off</td>
              <td>
                <Button onClick={startRealtimeDataHandler}>Fetch</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </RawDataTableContainer>
    </RawDataContainer>
  )
}

export default memo(RawDataLoadPage)
