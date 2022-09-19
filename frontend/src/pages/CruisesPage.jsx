import React, { useState, useEffect, memo } from "react"
import styled from "styled-components"

// import CruisesTable from "../components/cruisestable/CruisesTable"
import CruisesTable2 from "../components/CruisesTable2"
import CruisesMap from "../components/CruisesMap"

import {
  getPortArrivalsData,
  getCruiseVesselPositionData,
} from "../functionHandlers/loadCruiseShipArrivalsDataHandler"

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

const CruisesPage = () => {
  const [portArrivals, setPortArrivals] = useState([])
  const [vesselPositions, setVesselPositions] = useState([])
  const [loadingError, setLoadingError] = useState("")

  const homePosition = {
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  }

  useEffect(() => {
    let isSubscribed = true

    getPortArrivalsData()
      .then((returnedData) =>
        isSubscribed ? setPortArrivals(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))
    // .then((returnedData) => (isSubscribed ? console.log(returnedData) : null))

    return () => (isSubscribed = false)
  }, [])

  // console.log(portArrivals)

  // This routine gets Cruise Vessel position data - after portArrivals array has been filled
  useEffect(() => {
    let isSubscribed = true

    if (portArrivals.length !== 0) {
      getCruiseVesselPositionData(portArrivals)
        .then((returnedData) =>
          isSubscribed ? setVesselPositions(returnedData) : null
        )
        .catch((err) => (isSubscribed ? setLoadingError(err) : null))
      // .then((returnedData) => (isSubscribed ? console.log(returnedData) : null))
    }

    return () => (isSubscribed = false)
  }, [portArrivals])

  //  console.log(vesselPositions)

  return (
    <CruisesContainer>
      <CruisesTableContainer>
        {/* <CruisesTable
          cruisesTableTitle={"Cruise Ships Arriving Soon"}
          data={portArrivals}
          loadingError={loadingError}
        /> */}
        <CruisesTable2
          cruisesTableTitle={"Cruise Ships Arriving Soon"}
          data={portArrivals}
          loadingError={loadingError}
        />
      </CruisesTableContainer>
      <CruisesMapContainer>
        <CruisesMap
          cruisesMapTitle={"Cruise Ship Positions"}
          cruisesHomePosition={homePosition}
          vesselPositions={vesselPositions}
          // vesselDetails={portArrivals}
        />
      </CruisesMapContainer>
    </CruisesContainer>
  )
}

export default memo(CruisesPage)
