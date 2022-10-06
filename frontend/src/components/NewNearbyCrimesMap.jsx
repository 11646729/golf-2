// import React, { useState, useMemo, memo } from "react"
import React, { useMemo, memo } from "react"
import PropTypes from "prop-types"
import {
  GoogleMap,
  MarkerClusterer,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api"
import styled from "styled-components"

import Title from "./Title"

const NearbyCrimesMapContainer = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px;
  padding-top: 30px;
`

const options = {
  imagePath: "../../static/images/m", // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
}

const NearbyCrimesMap = (props) => {
  // const [selected, setSelected] = useState(null)

  const { crimesData, nearbyCrimesMapTitle } = props

  NearbyCrimesMap.propTypes = {
    crimesData: PropTypes.array,
    nearbyCrimesMapTitle: PropTypes.string,
  }

  const mapContainerStyle = {
    height: "750px",
    width: "750px",
    border: "1px solid #ccc",
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20,
  }

  const mapZoom = parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM)

  const mapCenter = useMemo(
    () => ({
      lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
      lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
    }),
    []
  )

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  return isLoaded ? (
    <NearbyCrimesMapContainer>
      <Title>{nearbyCrimesMapTitle}</Title>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={mapZoom}
        center={mapCenter}
        options={{
          // mapTypeId: "hybrid",
          disableDefaultUI: true,
          zoomControl: true,
        }}
      >
        {/* <Marker position={mapCenter} icon={iconPin} /> */}

        <MarkerClusterer options={options}>
          {(clusterer) =>
            crimesData.map((crime) => (
              <Marker
                key={`crime-${crime.id}`}
                position={{
                  lat: parseFloat(crime.location.latitude),
                  lng: parseFloat(crime.location.longitude),
                }}
                onClick={() => {
                  // setSelected(crime)
                  console.log(crime)
                }}
                clusterer={clusterer}
              />
            ))
          }
        </MarkerClusterer>
      </GoogleMap>
    </NearbyCrimesMapContainer>
  ) : null
}

export default memo(NearbyCrimesMap)
