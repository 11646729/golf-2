import React, { useState, useCallback, memo } from "react"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

import Title from "../title/Title"
// import LoadingTitle from "../loadingtitle/LoadingTitle"
import "./cruisemap.css"

function CruiseMap(props) {
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
    <div className="widgetCm">
      <div
        style={{
          marginTop: 35,
          marginLeft: 20,
          width: "97%",
        }}
      >
        <Title>{props.cruiseMapTitle}</Title>
        {/* {props.loadingError ? (
          <LoadingTitle>Error Loading...</LoadingTitle>
        ) : null} */}
      </div>
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
        <Marker onLoad={onLoadHandler} position={props.cruiseHomePosition} />
        <Marker
          onLoad={onLoadHandler}
          position={props.cruiseVesselPositions}
          icon={iconPin}
        />
      </GoogleMap>
    </div>
  ) : null
}

export default memo(CruiseMap)
