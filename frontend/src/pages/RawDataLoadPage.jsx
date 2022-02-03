import React, { memo } from "react"
import styled from "styled-components"

import Title from "../components/Title"

import {
  prepareTemperaturesTable,
  prepareGolfCoursesTable,
  importGolfCoursesData,
  preparePortArrivalsTable,
  prepareVesselsTable,
  importPortArrivalsAndVesselsData,
  importGTFSData,
} from "../axiosUtilities"
import { useState } from "react"

const RawDataContainer = styled.div`
  display: flex;
`

const RawDataTableContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const RawDataTableTitleContainer = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
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

  //
  // Prepare golfcourses table
  //
  const loadGolfCourseDataHandler = () => {
    var showResult = true
    var result = ""

    result = prepareGolfCoursesTable(showResult)

    if (showResult) {
      alert(result)
    }

    //
    // Import the file data into the database
    //
    importGolfCoursesData(
      "http://localhost:5000/api/golf/importGolfCoursesData"
    )
      .then((returnedData) => console.log(returnedData))
      .catch((err) => console.log(err))

    alert("Golf Courses data imported")
  }

  const loadCruiseShipDataHandler = () => {
    // Prepare portarrivals table
    var showResult = true
    var result = ""

    result = preparePortArrivalsTable(showResult)

    if (showResult) {
      alert(result)
    }

    // Prepare vessels table
    var showResult1 = true
    var result1 = ""

    result1 = prepareVesselsTable(showResult1)

    if (showResult1) {
      alert(result1)
    }

    // Import the scraped data into the database
    importPortArrivalsAndVesselsData(
      "http://localhost:5000/api/cruise/importPortArrivalsAndVesselsData",
      "Belfast"
    )
      .then((returnedData) => console.log(returnedData))
      .catch((err) => console.log(err))

    alert("Port Arrivals & Vessels data imported")
  }

  const loadGTFSTransportDataHandler = () => {
    // Import GTFS Data from Website into local SQL database
    var showResult = true
    var result = ""

    result = importGTFSData(showResult)

    if (showResult) {
      alert(result)
    }
  }

  const startRealtimeDataHandler = () => {
    alert("Realtime data available")
  }

  return (
    <RawDataContainer>
      <RawDataTableContainer>
        <RawDataTableTitleContainer>
          {/* <Title>{"In RawDataLoadPage.jsx"}</Title> */}
        </RawDataTableTitleContainer>
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
                <Button onClick={loadCruiseShipDataHandler}>Fetch</Button>
              </td>
            </tr>
            <tr>
              <td>GTFS Transport Data</td>
              <td>Ready</td>
              <td>
                <Button onClick={loadGTFSTransportDataHandler}>Fetch</Button>
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
