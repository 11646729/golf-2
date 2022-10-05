import React, { useState, useEffect, memo } from "react"
import styled from "styled-components"

import NearbyCrimesInputPanel from "../components/NearbyCrimesInputPanel"
import NearbyCrimesMap from "../components/NewNearbyCrimesMap"

import { getCrimesData } from "../functionHandlers/loadCrimesDataHandler"

const NearbyCrimesContainer = styled.div`
  display: flex;
  // flex-direction: column;
`

const NearbyCrimesInputPanelContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 150px;
`

const NearbyCrimesMapContainer = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 15px -10px rgba(0, 0, 0, 0.75);
  min-height: 800px;
`

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
const NearbyCrimesPage = () => {
  const [rawCrimesData, setCrimesData] = useState([])
  const [reformattedCrimesData, setReformattedCrimesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Required for location of crimes data to fetch
  const mapCenter = {
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  }

  // Required output from DataPicker
  const dateInfo = "&date=2022-06"

  // build Crimes Url - set dateInfo to "" to fetch most recent data
  const crimesUrl = `${process.env.REACT_APP_CRIMES_ENDPOINT}?lat=${mapCenter.lat}&lng=${mapCenter.lng}${dateInfo}`

  // Download crimes data
  useEffect(() => {
    getCrimesData(crimesUrl)
      .then((returnedCrimesData) => {
        setCrimesData(returnedCrimesData)

        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [crimesUrl])

  // Convert crimes data into suitable format to use with supercluster
  useEffect(() => {
    if (rawCrimesData.length !== 0) {
      const changedCrimesData = rawCrimesData.map((crime) => ({
        type: "Feature",
        properties: {
          cluster: false,
          crimeId: crime.id,
          category: crime.category,
          month: crime.month,
        },
        geometry: {
          type: "Point",
          coordinates: [
            parseFloat(crime.location.longitude),
            parseFloat(crime.location.latitude),
          ],
        },
      }))

      setReformattedCrimesData(changedCrimesData)
    }
  }, [rawCrimesData])

  if (rawCrimesData.length > 0) console.log(rawCrimesData)
  if (reformattedCrimesData.length > 0) console.log(reformattedCrimesData)

  return (
    <NearbyCrimesContainer>
      <NearbyCrimesInputPanelContainer>
        <NearbyCrimesInputPanel
          isLoading
          nearbyCrimesPanelTitle="Nearby Crimes"
          homeCheckboxLabel="Home Location"
          homeCheckboxStatus // Leaving it blank means true, "={false} otherwise"
          latestCheckboxLabel="Latest Available Data"
          latestCheckboxStatus
        />
      </NearbyCrimesInputPanelContainer>
      <NearbyCrimesMapContainer>
        <NearbyCrimesMap
          nearbyCrimesMapTitle="Crimes Location Map"
          crimesData={reformattedCrimesData}
        />
      </NearbyCrimesMapContainer>
    </NearbyCrimesContainer>
  )
}

export default memo(NearbyCrimesPage)
