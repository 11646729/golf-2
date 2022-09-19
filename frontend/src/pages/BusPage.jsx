import React, { useState, useEffect, memo } from "react"
import styled from "styled-components"

// import BusTable from "../components/BusTable"
import RouteSelectionPanel from "../components/RouteSelectionPanel"
import BusMap from "../components/BusMap"
import {
  getAgencyName,
  getAllStops,
  getAllShapes,
  getAllRoutes,
  // getDisplayData,
} from "../functionHandlers/loadBusTransportDataHandler"

const BusContainer = styled.div`
  display: flex;
`

const BusTableContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const BusMapContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

function BusPage() {
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

    getAgencyName("http://localhost:4000/api/bus/agencyname/")
      .then((returnedData) =>
        isSubscribed ? setBusAgencyName(returnedData[0].agency_name) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    // This function does some reduction & reformatting
    getAllShapes("http://localhost:4000/api/bus/shapes/")
      .then((returnedData) =>
        isSubscribed ? setBusShapesCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getAllStops("http://localhost:4000/api/bus/stops/")
      .then((returnedData) =>
        isSubscribed ? setBusStopsCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getAllRoutes("http://localhost:4000/api/bus/routes/")
      .then((returnedData) => (isSubscribed ? saveToHooks(returnedData) : null))
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  return (
    <BusContainer>
      <BusTableContainer>
        {/* <BusTable routesTableTitle={"Bus Routes Table"} /> */}
        <RouteSelectionPanel
          routesTableTitle="Bus Routes Table"
          busRoutesCollection={busRoutesCollection}
        />
      </BusTableContainer>
      <BusMapContainer>
        <BusMap
          busAgencyName={busAgencyName}
          busShapesCollection={busShapesCollection}
          busStopsCollection={busStopsCollection}
          busRoutesCollection={busRoutesCollection}
          // displayBusRoutesCollection={displayBusRoutesCollection}
          loadingError={loadingError}
        />
      </BusMapContainer>
    </BusContainer>
  )
}

export default memo(BusPage)
