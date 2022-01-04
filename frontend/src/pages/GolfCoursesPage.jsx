import React, { useState, useEffect, memo } from "react"

import GolfCoursesTable from "../components/GolfCoursesTable"
import GolfCoursesMap from "../components/GolfCoursesMap"
import getGolfCoursesData from "../axiosUtilities"

import styled from "styled-components"

const GolfCoursesContainer = styled.div`
  display: flex;
`

const GolfCoursesTableContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const GolfCoursesMapContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
function GolfCoursesPage() {
  const [golfCourses, setGolfCoursesData] = useState([])
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getGolfCoursesData("http://localhost:5000/api/golf/getGolfCourses")
      .then((returnedData) =>
        isSubscribed ? setGolfCoursesData(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  return (
    <GolfCoursesContainer>
      <GolfCoursesTableContainer>
        <GolfCoursesTable golfCoursesTableTitle={"Golf Courses Table"} />
      </GolfCoursesTableContainer>
      <GolfCoursesMapContainer>
        <GolfCoursesMap
          golfCoursesMapTitle={"Golf Courses Map"}
          golfCourses={golfCourses}
          loadingError={loadingError}
        />
      </GolfCoursesMapContainer>
    </GolfCoursesContainer>
  )
}

export default memo(GolfCoursesPage)
