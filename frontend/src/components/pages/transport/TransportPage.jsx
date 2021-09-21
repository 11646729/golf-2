import React, { useState, useEffect } from "react"
import "./transportpage.css"
import TransportMap from "../../transportmap/TransportMap"
import RouteSelectionPanel from "../../routeselectionpanel/RouteSelectionPanel"
import {
  getAgencyName,
  getAllStops,
  getAllShapes,
  getAllRoutes,
  // getDisplayData,
} from "../../Utilities"

export default function TransportPage() {
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

    getAgencyName("http://localhost:5000/api/transport/agencyname/")
      .then((returnedData) =>
        isSubscribed ? setBusAgencyName(returnedData[0].agency_name) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    // This function does some reduction & reformatting
    getAllShapes("http://localhost:5000/api/transport/shapes/")
      .then((returnedData) =>
        isSubscribed ? setBusShapesCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getAllStops("http://localhost:5000/api/transport/stops/")
      .then((returnedData) =>
        isSubscribed ? setBusStopsCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getAllRoutes("http://localhost:5000/api/transport/routes/")
      .then((returnedData) => (isSubscribed ? saveToHooks(returnedData) : null))
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  return (
    <div>
      <div className="container"></div>
      <TransportMap
        busAgencyName={busAgencyName}
        busShapesCollection={busShapesCollection}
        busStopsCollection={busStopsCollection}
        busRoutesCollection={busRoutesCollection}
        // displayBusRoutesCollection={displayBusRoutesCollection}
        loadingError={loadingError}
      />

      {/* <RouteSelectionPanel /> */}
    </div>
  )
}
