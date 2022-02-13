import React, { useState, useEffect, memo } from "react"
import {
  getThreeRingsShiftsData,
  getThreeRingsNewsData,
  getThreeRingsEventsData,
} from "../axiosUtilities"

import ThreeRingsShiftsList from "../components/ThreeRingsShiftsList"
import ThreeRingsNewsList from "../components/ThreeRingsNewsList"
import ThreeRingsEventsList from "../components/ThreeRingsEventsList"

import styled from "styled-components"

const IIIRContainer = styled.div`
  display: flex;
`

const IIIRShiftContainer = styled.div`
  flex: 3;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 600px;
`

const IIIRNewsContainer = styled.div`
  flex: 3;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const IIIREventsContainer = styled.div`
  flex: 3;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const ThreeRingsPage = () => {
  const [shiftsData, setShiftsData] = useState([])
  const [newsData, setNewsData] = useState([])
  const [eventsData, setEventsData] = useState([])
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

  // console.log(shiftsData)
  // console.log(newsData)
  console.log(eventsData)

  return (
    <IIIRContainer>
      <IIIRShiftContainer>
        <ThreeRingsShiftsList shiftsData={shiftsData}></ThreeRingsShiftsList>
      </IIIRShiftContainer>
      <IIIRNewsContainer>
        <ThreeRingsNewsList newsData={newsData}></ThreeRingsNewsList>
      </IIIRNewsContainer>
      <IIIREventsContainer>
        <ThreeRingsEventsList eventsData={eventsData}></ThreeRingsEventsList>
      </IIIREventsContainer>
    </IIIRContainer>
  )
}

export default memo(ThreeRingsPage)
