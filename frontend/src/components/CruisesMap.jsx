import React, { useState, useCallback, memo } from "react"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import styled from "styled-components"

import Title from "./Title"
// import LoadingTitle from "../LoadingTitle"

const CruisesMapContainer = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px;
  padding-top: 30px;
`

function CruisesMap(props) {
  const [map, setMap] = useState(null)
  const mapZoom = 4
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

  const iconPin = {
    path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
    fillColor: "#6dbef1",
    fillOpacity: 0.7,
    scale: 0.03, // to reduce the size of icons
    strokeColor: "#2f4024",
    strokeWeight: 1,
  }

  // Now compute bounds of map to display
  // if (map && props.busStopsCollection != null) {
  //   const bounds = new window.google.maps.LatLngBounds()
  //   props.busStopsCollection.map((busStop) => {
  //     const myLatLng = new window.google.maps.LatLng({
  //       lat: busStop.stop_lat,
  //       lng: busStop.stop_lon,
  //     })

  //     bounds.extend(myLatLng)
  //     return bounds
  //   })
  //   map.fitBounds(bounds)
  // }

  // Store a reference to the google map instance in state
  const onLoadHandler = useCallback(function callback(map) {
    // if (map && props.uniqueBusStopsCollection != null) {
    //   const bounds = new window.google.maps.LatLngBounds()
    //   props.uniqueBusStopsCollection.map((busStop) => {
    //     const myLatLng = new window.google.maps.LatLng({
    //       lat: busStop.stopCoordinates.lat,
    //       lng: busStop.stopCoordinates.lng,
    //     })
    //     bounds.extend(myLatLng)
    //     return bounds
    //   })
    //   map.fitBounds(bounds)
    // }
    setMap(map)
  }, [])

  // Clear the reference to the google map instance
  const onUnmountHandler = useCallback(function callback(map) {
    setMap(null)
  }, [])

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
        <Marker
          onLoad={onLoadHandler}
          position={props.cruisesVesselPositions}
          icon={iconPin}
        />
      </GoogleMap>
    </CruisesMapContainer>
  ) : null
}

export default memo(CruisesMap)
