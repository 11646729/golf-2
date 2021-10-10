import React, { useState, useEffect, memo } from "react"

import GolfCoursesTable from "../../components/GolfCoursesTable"
import GolfCoursesMap from "../../components/golfcoursemap/GolfCoursesMap"
import getGolfCourseData from "../../utilities"

import "./golfcoursespage.css"

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
function GolfCoursesPage() {
  const [golfCoursesData, setGolfCoursesData] = useState([])
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getGolfCourseData("http://localhost:5000/api/golf/nearbyGolfcourses")
      .then((returnedData) =>
        isSubscribed ? setGolfCoursesData(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  return (
    <div>
      <div className="container">
        <div className="golfcoursestablecontainer">
          <GolfCoursesTable golfCoursesTableTitle={"Golf Courses Table"} />
        </div>
        <div className="golfcoursesmapcontainer">
          <GolfCoursesMap
            golfCoursesMapTitle={"Golf Courses Map"}
            golfCoursesData={golfCoursesData}
            loadingError={loadingError}
          />
        </div>
      </div>
    </div>
  )
}

export default memo(GolfCoursesPage)
