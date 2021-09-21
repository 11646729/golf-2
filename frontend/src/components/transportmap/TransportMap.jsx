import React, { useState, useCallback, memo } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  // Marker,
  Polyline,
  // InfoWindow,
} from "@react-google-maps/api"
import { CssBaseline, Grid } from "@material-ui/core"

import Title from "../title/Title"
import LoadingTitle from "../loadingtitle/LoadingTitle"
// import RouteSelectionPanel from "../RouteSelectionPanel"
import "./transportmap.css"

// -------------------------------------------------------
// React View component
// -------------------------------------------------------
function TransportMap(props) {
  const [map, setMap] = useState(null)
  const newLocal = parseInt(
    process.env.REACT_APP_MAP_DEFAULT_ZOOM,
    process.env.REACT_APP_MAP_DEFAULT_ZOOM
  )
  const [mapZoom] = useState(newLocal)
  const [mapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  // Now compute bounds of map to display
  if (map && props.busStopsCollection != null) {
    const bounds = new window.google.maps.LatLngBounds()
    props.busStopsCollection.map((busStop) => {
      const myLatLng = new window.google.maps.LatLng({
        lat: busStop.stop_lat,
        lng: busStop.stop_lon,
      })

      bounds.extend(myLatLng)
      return bounds
    })
    map.fitBounds(bounds)
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

  // const handleBusStopClick = (event) => {
  //   console.log(event)
  //   // console.log(busStopSelected)
  //   // setBusStopSelected(busStop)
  // }

  const handleBusShapeClick = (event) => {
    console.log(event)
  }

  // const handleBusRouteClick = (event) => {
  //   console.log(event)
  //   // console.log(busRouteSelected)
  //   // setBusRouteSelected(busRoute)
  // }

  return isLoaded ? (
    <div className="widgetCm">
      <div>
        <CssBaseline />
        <Grid container spacing={1}>
          <Grid item xs={12} sm={12}>
            <div
              style={{
                marginTop: 55,
                marginLeft: 20,
                width: "97%",
              }}
            >
              <Title>{props.busAgencyName}</Title>
              {props.loadingError ? (
                <LoadingTitle>Error Loading...</LoadingTitle>
              ) : null}
            </div>
          </Grid>
          <Grid item xs={12} sm={9}>
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
              {props.busShapesCollection
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
                : null}
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
              : null} */}
              {/* {busStopSelected ? (
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
          </Grid>
          <Grid item xs={12} sm={3}>
            {/* <RouteSelectionPanel
            busRoutesCollection={props.busRoutesCollection}
            busAgencyName={props.busAgencyName}
          /> */}
          </Grid>
        </Grid>
      </div>
    </div>
  ) : null
}

export default memo(TransportMap)
