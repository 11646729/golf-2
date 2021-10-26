import React, { useState, useEffect, memo } from "react"
import styled from "styled-components"

// import CruisesTable from "../components/cruisestable/CruisesTable"
import CruisesTable2 from "../components/cruisestable2/CruisesTable2"
import CruisesMap from "../components/CruisesMap"
import Title from "../components/Title"
// import LoadingTitle from "../components/LoadingTitle"

import { getCruiseVesselData, getCruiseVesselPositionData } from "../utilities"

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
  var longlats = [
    [55.95473, -4.758], // lat, lng
    [55.843985, -4.9333],
    [55.42563, -4.917513],
    [55.001906, -5.34192],
    [54.719465, -5.514335],
    [54.62649822725435, -5.884617360308293],
  ]

  let shipPositions = []
  let loop = 0
  var i = setInterval(function () {
    if (loop >= longlats.length) {
      clearInterval(i)
      // console.log(shipPositions)
      setVesselPositions(shipPositions)
    } else {
      let shipPosition = {
        index: loop + 1,
        lat: longlats[loop][0],
        lng: longlats[loop][1],
      }

      shipPositions.push(shipPosition)
    }
    loop++
  }, 5000)

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

    // getCruiseVesselPositionData(
    //   "http://localhost:5000/api/cruise/vesselPosition"
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
        />
      </CruisesMapContainer>
    </CruisesContainer>
  )
}

export default memo(CruisesPage)
