import React, { useState, useEffect, useCallback, memo } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api"
import { CssBaseline, Grid } from "@material-ui/core"

import Title from "../Title"
import LoadingTitle from "../LoadingTitle"
import RouteSelectionPanel from "../RouteSelectionPanel"
import {
  getAgencyName,
  getAllStops,
  getAllRoutes,
  getDisplayData,
} from "../Utilities"

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
function GTFSTransportMap() {
  const [busAgencyName, setBusAgencyName] = useState()
  const [busStopsCollection, setBusStopsCollection] = useState([])
  const [busRoutesCollection, setBusRoutesCollection] = useState([])
  // const [displayBusRoutesCollection, setDisplayBusRoutesCollection] = useState(
  //   []
  // )
  const [loadingError, setLoadingError] = useState("")

  function saveToHooks(array) {
    setBusRoutesCollection(array)
    // setDisplayBusRoutesCollection(getDisplayData(array[0]))
  }

  useEffect(() => {
    let isSubscribed = true

    getAgencyName("http://localhost:5000/api/transport/agencyname/")
      .then((returnedData) =>
        isSubscribed ? setBusAgencyName(returnedData[0].agency_name) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getAllStops("http://localhost:5000/api/transport/stops/")
      .then((returnedData) =>
        isSubscribed ? setBusStopsCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getAllRoutes("http://localhost:5000/api/transport/routes/")
      .then((returnedData) => (isSubscribed ? saveToHooks(returnedData) : null))
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  return (
    <GTFSTransportMapView
      busAgencyName={busAgencyName}
      busStopsCollection={busStopsCollection}
      busRoutesCollection={busRoutesCollection}
      // displayBusRoutesCollection={displayBusRoutesCollection}
      loadingError={loadingError}
    />
  )
}

// -------------------------------------------------------
// React View component
// -------------------------------------------------------
function GTFSTransportMapView(props) {
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

  const handleBusStopClick = (event) => {
    console.log(event)
    // console.log(busStopSelected)
    // setBusStopSelected(busStop)
  }

  const handleBusRouteClick = (event) => {
    console.log(event)
    // console.log(busRouteSelected)
    // setBusRouteSelected(busRoute)
  }

  return isLoaded ? (
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
          <RouteSelectionPanel
            busRoutesCollection={props.busRoutesCollection}
            busAgencyName={props.busAgencyName}
          />
        </Grid>
      </Grid>
    </div>
  ) : null
}

export default memo(GTFSTransportMap)
