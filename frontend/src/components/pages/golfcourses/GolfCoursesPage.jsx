import React, { useState, useEffect, memo } from "react"

import GolfCoursesMap from "../../golfcoursemap/GolfCoursesMap"
import getGolfCourseData from "../../Utilities"
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
        <div className="golfcoursesmapcontainer">
          <GolfCoursesMap
            golfCoursesMapTitle={"Golf Courses"}
            golfCoursesData={golfCoursesData}
            loadingError={loadingError}
          />
        </div>
        <div classname="cruisetablecontainer"></div>
        Table Location
      </div>
    </div>
  )
}

export default memo(GolfCoursesPage)
