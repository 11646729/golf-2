import React, { useState, useEffect, memo } from "react"
import {
  getThreeRingsShiftsData,
  getThreeRingsNewsData,
  getThreeRingsEventsData,
} from "../axiosUtilities"

import Title from "../components/Title"

import styled from "styled-components"

const ThreeRingsContainer = styled.div`
  display: flex;
`

const ThreeRingsContainerTitle = styled.div`
  margin-top: 35px;
  margin-left: 20px;
  margin-right: 20px;
  width: "97%";
`

const ThreeRingsShiftContainer = styled.div`
  flex: 3;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const ThreeRingsNewsContainer = styled.div`
  flex: 3;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const ThreeRingsEventsContainer = styled.div`
  flex: 3;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

function ThreeRingsPage() {
  const [shiftsData, setShiftsData] = useState()
  const [newsData, setNewsData] = useState()
  const [eventsData, setEventsData] = useState()
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getThreeRingsShiftsData("http://localhost:4000/api/threerings/shifts")
      .then((returnedData) =>
        isSubscribed ? setShiftsData(returnedData.shifts) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getThreeRingsNewsData("http://localhost:4000/api/threerings/news")
      .then((returnedData) =>
        isSubscribed ? setNewsData(returnedData.news_items) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getThreeRingsEventsData("http://localhost:4000/api/threerings/events")
      .then((returnedData) =>
        isSubscribed ? setEventsData(returnedData.events) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  console.log(shiftsData)
  console.log(newsData)
  console.log(eventsData)

  return (
    <ThreeRingsContainer>
      <ThreeRingsShiftContainer>
        <ThreeRingsContainerTitle>
          <Title>{"Three Rings Operations Display"}</Title>
        </ThreeRingsContainerTitle>
      </ThreeRingsShiftContainer>
      <ThreeRingsNewsContainer></ThreeRingsNewsContainer>
      <ThreeRingsEventsContainer></ThreeRingsEventsContainer>
    </ThreeRingsContainer>
  )
}

export default memo(ThreeRingsPage)
