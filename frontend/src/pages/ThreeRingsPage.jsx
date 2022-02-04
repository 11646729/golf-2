import React, { useState, useEffect, memo } from "react"
import { getThreeRingsShiftData } from "../axiosUtilities"

import styled from "styled-components"

const ThreeRingsContainer = styled.div`
  display: flex;
`

function ThreeRingsPage() {
  const [threeRingsShiftData, setThreeRingsShiftData] = useState()
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getThreeRingsShiftData("http://localhost:4000/api/threerings/shifts")
      .then((returnedData) =>
        isSubscribed
          ? console.log(returnedData)
          : // setThreeRingsShiftData(returnedData[0].agency_name)
            null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  return <ThreeRingsContainer></ThreeRingsContainer>
}

export default memo(ThreeRingsPage)
