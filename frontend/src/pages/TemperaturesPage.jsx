import React, { useState, useEffect, memo } from "react"
import io from "socket.io-client"

import TemperaturesTable from "../components/TemperaturesTable"
import TemperaturesChart from "../components/TemperaturesChart"
import getTemperatureData from "../axiosUtilities"

import styled from "styled-components"

const TemperaturesContainer = styled.div`
  display: flex;
`

const TemperaturesTableContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const TemperaturesChartContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT)

function TemperaturesPage() {
  const [temperatureData, setTemperatureData] = useState([])
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getTemperatureData("http://localhost:5000/api/weather/getTemperatures")
      .then((returnedData) =>
        isSubscribed ? setTemperatureData(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  // Now delete all except the last 20 readings
  temperatureData.splice(0, temperatureData.length - 20)

  const fetchRTTemperatureData = (temperatures) => {
    socket.on("DataFromDarkSkiesAPI", (currentData) => {
      console.log(currentData)
      // Need to cancel the Promise here to stop errors
      // setTemperatureData((temps) => [...temps, currentData.temperature])
    })
    // Only display data for the last 20 values
    // temperatureValues.splice(0, temperatureValues.length - 20)
  }

  // socket.on("connect", () => {
  //   console.log(socket.id) // x8WIv7-mJelg7on_ALbx
  // })

  // Listen for realtime temperature data and update the state
  if (temperatureData.length > 0) {
    fetchRTTemperatureData(temperatureData)
  }

  // const clearDataArray = () => {
  //   // Error here
  //   setTemperatureData(() => [])
  // }

  return (
    <TemperaturesContainer>
      <TemperaturesTableContainer>
        <TemperaturesTable temperaturesTableTitle={"Temperatures Table"} />
      </TemperaturesTableContainer>
      <TemperaturesChartContainer>
        <TemperaturesChart
          temperatureData={temperatureData}
          loadingError={loadingError}
        />
      </TemperaturesChartContainer>
    </TemperaturesContainer>
  )
}

export default memo(TemperaturesPage)
