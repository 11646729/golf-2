import React, { useState, useEffect, memo } from "react"
import io from "socket.io-client"

import TemperaturesChart from "../../components/temperatureschart/TemperaturesChart"
import getTemperatureData from "../../utilities"

const socket = io(process.env.REACT_APP_SOCKET_ENDPOINT)

function TemperaturesPage() {
  const [temperatureData, setTemperatureData] = useState([])
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getTemperatureData("http://localhost:5000/api/weather/temperatureReadings")
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
    <TemperaturesChart
      temperatureData={temperatureData}
      loadingError={loadingError}
    />
  )
}

export default memo(TemperaturesPage)
