import React, { memo } from "react"
import styled from "styled-components"

import Title from "../components/Title"

import {
  prepareGolfCoursesTable,
  importGolfCoursesData,
  preparePortArrivalsTable,
} from "../utilities"

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
  // const prepareAllDatabaseTablesHandler = () => {
  //   alert("Prepare set of empty database tables")
  // }

  const loadGolfCourseDataHandler = () => {
    // Firstly prepare database table
    // i.e. create if doesn't exist
    // or delete rows if it exists
    prepareGolfCoursesTable(
      "http://localhost:5000/api/golf/prepareGolfCoursesTable"
    )
      .then((returnedData) => console.log(returnedData))
      .catch((err) => console.log(err))

    // Secondly import the file data into the database
    importGolfCoursesData(
      "http://localhost:5000/api/golf/importGolfCoursesData"
    )
      .then((returnedData) => console.log(returnedData))
      .catch((err) => console.log(err))

    alert("Empty golfcourses table prepared")
  }

  const loadCruiseShipDataHandler = () => {
    // Firstly prepare database table
    // i.e. create if doesn't exist
    // or delete rows if it exists
    preparePortArrivalsTable(
      "http://localhost:5000/api/cruise/preparePortArrivalsTable"
    )
      .then((returnedData) => console.log(returnedData))
      .catch((err) => console.log(err))

    alert("Empty portarrivals table prepared")
  }

  const loadGTFSTransportDataHandler = () => {
    alert("Load GTFS Transport Data")
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
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>Prepare Temperature Database Table</td>
              <td>
                <Button onClick={prepareAllDatabaseTablesHandler}>Fetch</Button>
              </td>
            </tr> */}
            <tr>
              <td>Golf Course Data</td>
              <td>
                <Button onClick={loadGolfCourseDataHandler}>Fetch</Button>
              </td>
            </tr>
            <tr>
              <td>Cruise Ship Arrivals Data</td>
              <td>
                <Button onClick={loadCruiseShipDataHandler}>Fetch</Button>
              </td>
            </tr>
            <tr>
              <td>GTFS Transport Data</td>
              <td>
                <Button onClick={loadGTFSTransportDataHandler}>Fetch</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </RawDataTableContainer>
    </RawDataContainer>
  )
}

export default memo(RawDataLoadPage)
