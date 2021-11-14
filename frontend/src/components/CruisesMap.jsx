import React, { useState, useCallback, memo } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import styled from "styled-components"

import Title from "./Title"
// import LoadingTitle from "../LoadingTitle"

const CruisesMapContainer = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px;
  padding-top: 30px;
`

const CruisesMap = (props) => {
  const [map, setMap] = useState(null)
  const [selected, setSelected] = useState(null)

  const mapZoom = parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM)

  const mapCenter = {
    lat: parseFloat(process.env.REACT_APP_BELFAST_PORT_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_BELFAST_PORT_LONGITUDE),
  }

  const mapContainerStyle = {
    height: "450px",
    width: "94%",
    border: "1px solid #ccc",
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20,
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  // Store a reference to the google map instance in state
  const onLoadHandler = useCallback(function callback(map) {
    setMap(map)
  }, [])

  // Clear the reference to the google map instance
  const onUnmountHandler = useCallback(function callback() {
    setMap(null)
  }, [])

  // Now compute bounds of map to display
  if (map && props.vesselPositions != null) {
    const bounds = new window.google.maps.LatLngBounds()
    props.vesselPositions.map((vesselPosition) => {
      const myLatLng = new window.google.maps.LatLng({
        lat: vesselPosition.lat,
        lng: vesselPosition.lng,
      })
      bounds.extend(myLatLng)
      return bounds
    })
    map.fitBounds(bounds)
  }

  const iconPin = {
    path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
    fillColor: "#6dbef1",
    fillOpacity: 0.7,
    scale: 0.03, // to reduce the size of icons
    strokeColor: "#2f4024",
    strokeWeight: 1,
  }

  return isLoaded ? (
    <CruisesMapContainer>
      <Title>{props.cruisesMapTitle}</Title>
      {/* {props.loadingError ? (
          <LoadingTitle>Error Loading...</LoadingTitle>
        ) : null} */}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={mapCenter}
        zoom={mapZoom}
        options={{
          // mapTypeId: "hybrid",
          disableDefaultUI: true,
          zoomControl: true,
        }}
        onLoad={onLoadHandler}
        onUnmount={onUnmountHandler}
      >
        <Marker onLoad={onLoadHandler} position={props.cruisesHomePosition} />

        {props.vesselPositions
          ? props.vesselPositions.map((vesselPosition) => (
              <Marker
                key={vesselPosition.index}
                onLoad={onLoadHandler}
                position={{
                  lat: vesselPosition.lat,
                  lng: vesselPosition.lng,
                }}
                icon={iconPin}
                onClick={() => {
                  setSelected(vesselPosition)
                }}
              />
            ))
          : null}

        {selected ? (
          <InfoWindow
            position={{
              lat: selected.lat,
              lng: selected.lng,
            }}
            onCloseClick={() => {
              setSelected(null)
            }}
          >
            <span>En Route to: {selected.destination}</span>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </CruisesMapContainer>
  ) : null
}

export default memo(CruisesMap)
