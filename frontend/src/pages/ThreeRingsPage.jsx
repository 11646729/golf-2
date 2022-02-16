import React, { useState, useEffect, memo } from "react"
import {
  getThreeRingsShiftsData,
  getThreeRingsNewsData,
  getThreeRingsEventsData,
} from "../axiosUtilities"

import ThreeRingsShiftsList from "../components/ThreeRingsShiftsList"
import ThreeRingsNewsList from "../components/ThreeRingsNewsList"
import ThreeRingsEventsList from "../components/ThreeRingsEventsList2"

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
  min-height: 600px;
`

const IIIREventsContainer = styled.div`
  flex: 3;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 600px;
`

const ThreeRingsPage = () => {
  const [shiftsData, setShiftsData] = useState([])
  const [newsData, setNewsData] = useState([])
  const [eventsData, setEventsData] = useState([])
  const [loadingError, setLoadingError] = useState("")

  const getShiftsData = () => {
    getThreeRingsShiftsData("http://localhost:4000/api/threerings/shifts")
      .then((returnedData) => setShiftsData(returnedData.shifts))
      .catch((err) => setLoadingError(err))
  }

  const getNewsData = () => {
    getThreeRingsNewsData("http://localhost:4000/api/threerings/news")
      .then((returnedData) => setNewsData(returnedData.news_items))
      .catch((err) => setLoadingError(err))
  }

  const getEventsData = () => {
    getThreeRingsEventsData("http://localhost:4000/api/threerings/events")
      .then((returnedData) => setEventsData(returnedData.events))
      .catch((err) => setLoadingError(err))
  }

  const newsRotateSpeedInSeconds = 4
  const refreshIntervalInMinutes = 1

  useEffect(() => {
    // This is to fire these function immediately - then the interval timer takes over
    getShiftsData()
    getNewsData()
    getEventsData()

    var shiftsInterval = setInterval(
      getShiftsData,
      refreshIntervalInMinutes * 1000 * 60
    )

    var newsInterval = setInterval(getNewsData, newsRotateSpeedInSeconds * 1000)

    var eventsInterval = setInterval(
      getEventsData,
      refreshIntervalInMinutes * 1000 * 60
    )

    return () => {
      clearInterval(shiftsInterval)
      clearInterval(newsInterval)
      clearInterval(eventsInterval)
    }
  }, [])

  console.log(shiftsData)
  console.log(newsData)
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
