import React, { useState, useEffect, memo } from "react"

// import TransportTable from "../components/TransportTable"
import RouteSelectionPanel from "../components/RouteSelectionPanel"
import TransportMap from "../components/TransportMap"
import {
  getAgencyName,
  getAllStops,
  getAllShapes,
  getAllRoutes,
  // getDisplayData,
} from "../axiosUtilities"

import styled from "styled-components"

const TransportContainer = styled.div`
  display: flex;
`

const TransportTableContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const TransportMapContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

function TransportPage() {
  const [busAgencyName, setBusAgencyName] = useState()
  const [busShapesCollection, setBusShapesCollection] = useState([])
  const [busStopsCollection, setBusStopsCollection] = useState([])
  const [busRoutesCollection, setBusRoutesCollection] = useState([])
  // const [displayBusRoutesCollection, setDisplayBusRoutesCollection] = useState(
  //   []
  // )
  const [loadingError, setLoadingError] = useState("")

  function saveToHooks(array) {
    setBusRoutesCollection(array)
    // setDisplayBusRoutesCollection(getDisplayData(array[0]))
  }

  useEffect(() => {
    let isSubscribed = true

    getAgencyName("http://localhost:4000/api/transport/agencyname/")
      .then((returnedData) =>
        isSubscribed ? setBusAgencyName(returnedData[0].agency_name) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    // This function does some reduction & reformatting
    getAllShapes("http://localhost:4000/api/transport/shapes/")
      .then((returnedData) =>
        isSubscribed ? setBusShapesCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getAllStops("http://localhost:4000/api/transport/stops/")
      .then((returnedData) =>
        isSubscribed ? setBusStopsCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getAllRoutes("http://localhost:4000/api/transport/routes/")
      .then((returnedData) => (isSubscribed ? saveToHooks(returnedData) : null))
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  return (
    <TransportContainer>
      <TransportTableContainer>
        {/* <TransportTable routesTableTitle={"Bus Routes Table"} /> */}
        <RouteSelectionPanel
          routesTableTitle={"Bus Routes Table"}
          busRoutesCollection={busRoutesCollection}
        />
      </TransportTableContainer>
      <TransportMapContainer>
        <TransportMap
          busAgencyName={busAgencyName}
          busShapesCollection={busShapesCollection}
          busStopsCollection={busStopsCollection}
          busRoutesCollection={busRoutesCollection}
          // displayBusRoutesCollection={displayBusRoutesCollection}
          loadingError={loadingError}
        />
      </TransportMapContainer>
    </TransportContainer>
  )
}

export default memo(TransportPage)
