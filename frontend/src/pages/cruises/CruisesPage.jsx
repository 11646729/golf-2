import React, { useState, useEffect, memo } from "react"

import CruisesTable from "../../components/cruisestable/CruisesTable"
import CruisesMap from "../../components/cruisesmap/CruisesMap"
import {
  getCruiseVesselData,
  getCruiseVesselPositionData,
} from "../../utilities"

import "./cruisespage.css"

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
    <div>
      <div className="container">
        <div className="cruisestablecontainer">
          <CruisesTable
            cruisesTableTitle={"Cruise Ships Arriving Soon"}
            cruisesData={portArrivals}
            loadingError={loadingError}
          />
        </div>
        <div className="cruisesmapcontainer">
          <CruisesMap
            cruisesMapTitle={"Current Locations"}
            cruisesHomePosition={HomePosition}
            cruisesVesselPositions={AnthemOfTheSeasPosition}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(CruisesPage)
