import React, { useState, useEffect, memo } from "react"
import "./cruisepage.css"

import CruiseMap from "../../components/cruisemap/CruiseMap"
import CruiseTable from "../../components/cruisetable/CruiseTable"
import {
  getCruiseVesselData,
  getCruiseVesselPositionData,
} from "../../Utilities"

function CruisePage() {
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
        <div className="cruisetablecontainer">
          <CruiseTable
            cruiseTableTitle={"Cruise Ships Arriving Soon"}
            cruiseData={portArrivals}
            loadingError={loadingError}
          />
        </div>
        <div className="cruisemapcontainer">
          <CruiseMap
            cruiseMapTitle={"Current Locations"}
            cruiseHomePosition={HomePosition}
            cruiseVesselPositions={AnthemOfTheSeasPosition}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(CruisePage)
