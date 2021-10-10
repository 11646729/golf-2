import React, { useState, useEffect, memo } from "react"

import CruisesTable from "../components/cruisestable/CruisesTable"
import CruisesMap from "../components/cruisesmap/CruisesMap"
import { getCruiseVesselData, getCruiseVesselPositionData } from "../utilities"

import styled from "styled-components"

const CruisesContainer = styled.div`
  display: flex;
`

const CruisesTableContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
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

  const HomePosition = {
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  }

  const AnthemOfTheSeasPosition = {
    lat: 55.95473,
    lng: -4.758,
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

    return () => (isSubscribed = false)
  }, [])

  return (
    <CruisesContainer>
      <CruisesTableContainer>
        <CruisesTable
          cruisesTableTitle={"Cruise Ships Arriving Soon"}
          cruisesData={portArrivals}
          loadingError={loadingError}
        />
      </CruisesTableContainer>
      <CruisesMapContainer>
        <CruisesMap
          cruisesMapTitle={"Current Locations"}
          cruisesHomePosition={HomePosition}
          cruisesVesselPositions={AnthemOfTheSeasPosition}
        />
      </CruisesMapContainer>
    </CruisesContainer>
  )
}

export default memo(CruisesPage)
