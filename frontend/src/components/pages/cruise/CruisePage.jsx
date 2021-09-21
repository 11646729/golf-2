import React, { useState, useEffect } from "react"
import getData from "../../Utilities"
import "./cruisepage.css"
import CruiseMap from "../../cruisemap/CruiseMap"
import CruiseTable from "../../cruisetable/CruiseTable"

export default function CruisePage() {
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
        {/* <CruiseTable
          CruiseTableTitle={"Cruise Arrivals"}
          cruiseData={portArrivals}
          loadingError={loadingError}
        /> */}
        <CruiseMap CruiseMapTitle={"Map"} />
      </div>
    </div>
  )
}
