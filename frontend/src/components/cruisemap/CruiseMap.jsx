import React, { useState, useCallback } from "react"
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"
import "./cruisemap.css"

function CruiseMap(props) {
  const [map, setMap] = useState(null)

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  const containerStyle = {
    width: "100%",
    height: "400px",
  }

  const mapCenter = {
    lat: parseFloat(process.env.REACT_APP_BELFAST_PORT_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_BELFAST_PORT_LONGITUDE),
  }

  const mapZoom = 4

  const HomePosition = {
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  }

  const AnthemOfTheSeasPosition = {
    // lat: 49.74872,
    // lng: -5.20943,
    // lat: 53.39031,
    // lng: -5.32638,
    lat: 55.95473,
    lng: -4.758,
  }

  const iconPin = {
    path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
    fillColor: "#6dbef1",
    fillOpacity: 0.7,
    scale: 0.03, // to reduce the size of icons
    strokeColor: "#2f4024",
    strokeWeight: 1,
  }

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
      <GoogleMap
        mapContainerStyle={{
          height: "600px",
          width: "97%",
          border: "1px solid #ccc",
          marginLeft: 20,
          marginRight: 10,
          marginBottom: 20,
        }}
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
        <Marker onLoad={onLoadHandler} position={HomePosition} />
        <Marker
          onLoad={onLoadHandler}
          position={AnthemOfTheSeasPosition}
          icon={iconPin}
        />

        {/* {props.busShapesCollection
  ? props.busShapesCollection.map((busShape) => (
      <Polyline
        key={busShape.shapeKey}
        path={busShape.shapeCoordinates}
        options={{
          strokeColor: busShape.defaultColor,
          strokeOpacity: "1.0",
          strokeWeight: 2,
        }}
        onClick={() => {
          handleBusShapeClick()
        }}
      />
    ))
  : null} */}
        {/* {props.busStopsCollection
? props.busStopsCollection.map((busStop) => (
    <Marker
      key={busStop.stop_id}
      position={{
        lat: busStop.stop_lat,
        lng: busStop.stop_lon,
      }}
      icon={{
        url: "http://maps.google.com/mapfiles/ms/icons/blue.png",
      }}
      onClick={() => {
        handleBusStopClick()
      }}
    />
  ))
: null}
{busStopSelected ? (
<InfoWindow
  position={{
    lat: busStopSelected.stop_lat,
    lng: busStopSelected.stop_lon,
  }}
  onCloseClick={() => {
    setBusStopSelected(null)
  }}
>
  <div style={classes.divStyle}>
    <Typography gutterBottom variant="h5" component="h2">
      {busStopSelected.stop_name}
    </Typography>
  </div>
</InfoWindow>
) : null} */}
      </GoogleMap>
    </div>
  ) : null
}

export default React.memo(CruiseMap)
