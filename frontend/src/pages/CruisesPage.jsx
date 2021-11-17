import React, { useState, useEffect, memo } from "react"
import styled from "styled-components"

// import CruisesTable from "../components/cruisestable/CruisesTable"
import CruisesTable2 from "../components/CruisesTable2"
import CruisesMap from "../components/CruisesMap"
import Title from "../components/Title"
// import LoadingTitle from "../components/LoadingTitle"

import {
  getCruiseVesselData,
  getCruiseVesselPositionData,
  getCruiseVesselPositionTestData,
} from "../utilities.js"

const CruisesContainer = styled.div`
  display: flex;
`

const CruisesTableContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const CruisesTableContainerTitle = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const CruisesMapContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

function CruisesPage() {
  const [portArrivals, setPortArrivals] = useState([])
  const [vesselPositions, setVesselPositions] = useState([])
  const [loadingError, setLoadingError] = useState("")

  const homePosition = {
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  }

  useEffect(() => {
    let isSubscribed = true

    getCruiseVesselData("http://localhost:5000/api/cruise/portArrivals")
      .then((returnedData) =>
        isSubscribed ? setPortArrivals(returnedData) : null
      )
      // .then((returnedData) => (isSubscribed ? console.log(returnedData) : null))
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getCruiseVesselPositionData(
      "http://localhost:5000/api/cruise/vesselPosition"
    )
      .then((returnedData) =>
        isSubscribed ? setVesselPositions(returnedData) : null
      )
      // .then((returnedData) => (isSubscribed ? console.log(returnedData) : null))
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    // getCruiseVesselPositionTestData(
    //   "http://localhost:5000/api/cruise/vesselPositionTest"
    // )
    //   .then((returnedData) =>
    //     isSubscribed ? setVesselPositions(returnedData) : null
    //   )
    //   // .then((returnedData) => (isSubscribed ? console.log(returnedData) : null))
    //   .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  return (
    <CruisesContainer>
      <CruisesTableContainer>
        <CruisesTableContainerTitle>
          <Title>{"Cruise Ships Arriving Soon"}</Title>
          {/* {props.loadingError ? (
          <LoadingTitle>Error Loading...</LoadingTitle>
        ) : null} */}
        </CruisesTableContainerTitle>
        {/* <CruisesTable data={portArrivals} loadingError={loadingError} /> */}
        <CruisesTable2 data={portArrivals} loadingError={loadingError} />
      </CruisesTableContainer>
      <CruisesMapContainer>
        <CruisesMap
          cruisesMapTitle={"Current Locations"}
          cruisesHomePosition={homePosition}
          vesselPositions={vesselPositions}
          // vesselDetails={portArrivals}
        />
      </CruisesMapContainer>
    </CruisesContainer>
  )
}

export default memo(CruisesPage)
