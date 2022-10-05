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

  // const iconPin = {
  //   path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
  //   fillColor: "#78a32e",
  //   fillOpacity: 0.7,
  //   scale: 0.03, // to reduce the size of icons
  //   strokeColor: "#2f4024",
  //   strokeWeight: 1,
  // }

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
                key={`crime-${crime.properties.crimeId}`}
                position={{
                  lat: crime.geometry.coordinates[1],
                  lng: crime.geometry.coordinates[0],
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
