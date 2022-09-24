import React, { useState, useEffect, memo } from "react"
import styled from "styled-components"

import BusRouteSelectionPanel from "../components/BusRouteSelectionPanel"
import BusRoutesMap from "../components/BusRoutesMap"
import {
  getAgencyName,
  getAllStops,
  getAllShapes,
  getAllRoutes,
  // getDisplayData,
} from "../functionHandlers/loadBusTransportDataHandler"

const BusRoutesContainer = styled.div`
  display: flex;
`

const BusRoutesTableContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const BusRoutesMapContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const BusRoutesPage = () => {
  const [busAgencyName, setBusAgencyName] = useState()
  const [busShapesCollection, setBusShapesCollection] = useState([])
  const [busStopsCollection, setBusStopsCollection] = useState([])
  const [busRoutesCollection, setBusRoutesCollection] = useState([])
  // const [displayBusRoutesCollection, setDisplayBusRoutesCollection] = useState(
  //   []
  // )
  const [loadingError, setLoadingError] = useState("")

  const saveToHooks = (array) => {
    setBusRoutesCollection(array)
    // setDisplayBusRoutesCollection(getDisplayData(array[0]))
  }

  useEffect(() => {
    let isSubscribed = true

    getAgencyName()
      .then((returnedData) =>
        isSubscribed ? setBusAgencyName(returnedData[0].agency_name) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    // This function does some reduction & reformatting
    getAllShapes()
      .then((returnedData) =>
        isSubscribed ? setBusShapesCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getAllStops()
      .then((returnedData) =>
        isSubscribed ? setBusStopsCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getAllRoutes()
      .then((returnedData) => (isSubscribed ? saveToHooks(returnedData) : null))
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  return (
    <BusRoutesContainer>
      <BusRoutesTableContainer>
        <BusRouteSelectionPanel
          routesTableTitle="Bus Routes Table"
          busRoutesCollection={busRoutesCollection}
        />
      </BusRoutesTableContainer>
      <BusRoutesMapContainer>
        <BusRoutesMap
          busAgencyName={busAgencyName}
          busShapesCollection={busShapesCollection}
          busStopsCollection={busStopsCollection}
          busRoutesCollection={busRoutesCollection}
          // displayBusRoutesCollection={displayBusRoutesCollection}
          loadingError={loadingError}
        />
      </BusRoutesMapContainer>
    </BusRoutesContainer>
  )
}

export default memo(BusRoutesPage)
