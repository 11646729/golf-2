import React, { useState, useEffect, memo } from "react"
import axios from "axios"
import styled from "styled-components"

import NearbyCrimesMap from "../components/NearbyCrimesMap"

const NearbyCrimesContainer = styled.div`
  display: flex;
`

const NearbyCrimesMapContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 500px;
`

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
const NearbyCrimesPage = () => {
  const [crimesData, setCrimesData] = useState([])

  const mapCenter = {
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  }

  const dateInfo = "&date=2022-06"

  // build Crimes Url - set dateInfo to "" to fetch most recent data
  const url = `${process.env.REACT_APP_CRIMES_ENDPOINT}?lat=${mapCenter.lat}&lng=${mapCenter.lng}${dateInfo}`

  console.log(url)

  // -------------------------------------------------------
  // const [mapCenter, setMapCenter] = useState({
  //   lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
  //   lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  // })

  // setMapCenter({
  //   lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
  //   lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  // })
  // -------------------------------------------------------

  // Fetch crimes data
  useEffect(() => {
    const getAllData = async () => {
      const source = axios.CancelToken.source()
      // setLoadingData(true)
      await axios
        .get(url, {
          cancelToken: source.token,
        })
        .then((response) => {
          setCrimesData(response.data)
          // setLoadingData(false)
        })
        .catch((error) => {
          if (axios.isCancel(error)) {
            console.log(error) // Component unmounted, request is cancelled
          } else {
            // setLoadingError(error)
          }
        })
      return () => {
        source.cancel("Component unmounted, request is cancelled")
      }
    }
    getAllData()
  }, [url, dateInfo])
  // }, [homeCheckbox, latestDataCheckbox, dateInfo, url])

  console.log(crimesData)

  return (
    <NearbyCrimesContainer>
      <NearbyCrimesMapContainer>
        <NearbyCrimesMap nearbyCrimesMapTitle="Nearby Crimes" />
      </NearbyCrimesMapContainer>
    </NearbyCrimesContainer>
  )
}

export default memo(NearbyCrimesPage)
