import React, { useState, useEffect, memo } from "react"
import getData from "../../Utilities"

import "./cruisepage.css"
import CruiseMap from "../../cruisemap/CruiseMap"
import CruiseTable from "../../cruisetable/CruiseTable"

function CruisePage() {
  const [portArrivals, setData] = useState([])
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getData("http://localhost:5000/api/cruise/portArrivals")
      .then((returnedData) => (isSubscribed ? setData(returnedData) : null))
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  return (
    <div>
      <div className="container">
        <div className="cruisetablecontainer">
          <CruiseTable
            CruiseTableTitle={"Cruise Ships Arriving Soon"}
            cruiseData={portArrivals}
            loadingError={loadingError}
          />
        </div>
        <div className="cruisemapcontainer">
          <CruiseMap CruiseMapTitle={"Current Locations"} />
        </div>
      </div>
    </div>
  )
}

export default memo(CruisePage)
