import React, { useState, useEffect, memo } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api"
import { CssBaseline, Grid } from "@material-ui/core"

import Title from "./Title"
import LoadingTitle from "./LoadingTitle"
import RouteSelectionPanel from "./RouteSelectionPanel"
import { getShapesData, getStopsData, getDisplayData } from "./Utilities"

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
function TransportMap() {
  // const [uniqueBusRoutesCollection, setUniqueBusRoutesCollection] = useState([])
  const [uniqueBusShapesCollection, setUniqueBusShapesCollection] = useState([])
  const [busStopsCollection, setBusStopsCollection] = useState([])
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getShapesData("http://localhost:5000/api/transport/tshape/")
      .then((returnedData) =>
        isSubscribed ? setUniqueBusShapesCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getStopsData("http://localhost:5000/api/transport/tstop/")
      .then((returnedData) =>
        isSubscribed ? setBusStopsCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  console.log(busStopsCollection)

  return (
    <TransportMapView
      uniqueBusShapesCollection={uniqueBusShapesCollection}
      busStopsCollection={busStopsCollection}
      loadingError={loadingError}
    />
  )
}

// -------------------------------------------------------
// React View component
// -------------------------------------------------------
function TransportMapView(props) {
  const [mapRef, setMapRef] = useState(null)
  const newLocal = parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM, 10)
  const [mapZoom] = useState(newLocal)
  const [mapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  // const [busStopSelected, setBusStopSelected] = useState(null)
  // const [busShapeSelected, setBusShapeSelected] = useState(null)

  // Now compute bounds of map to display
  if (mapRef && props.busStopsCollection != null) {
    const bounds = new window.google.maps.LatLngBounds()
    props.busStopsCollection.map((busStop) => {
      const myLatLng = new window.google.maps.LatLng({
        lat: busStop.stopCoordinates.lat,
        lng: busStop.stopCoordinates.lng,
      })

      bounds.extend(myLatLng)
      return bounds
    })
    mapRef.fitBounds(bounds)
  }

  // -----------------------------------------------------
  // EVENT HANDLERS SECTION
  // -----------------------------------------------------
  // Store a reference to the google map instance
  const onLoadHandler = (map) => {
    setMapRef(map)
  }

  // Clear the reference to the google map instance
  const onUnmountHandler = () => {
    setMapRef(null)
  }

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
            <Title>Transport UI Test</Title>
            {props.loadingError ? (
              <LoadingTitle>Error Loading...</LoadingTitle>
            ) : null}
          </div>
        </Grid>
        <Grid item xs={12} sm={9}>
          <GoogleMap
            mapContainerStyle={{
              height: "600px",
              border: "1px solid #ccc",
              marginLeft: 20,
              marginRight: 10,
              marginBottom: 50,
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
            {props.uniqueBusShapesCollection
              ? props.uniqueBusShapesCollection.map((busRoute) => (
                  <Polyline
                    key={busRoute.shapeKey}
                    path={busRoute.shapeCoordinates}
                    options={{
                      strokeColor: busRoute.routeColor,
                      strokeOpacity: "1.0",
                      strokeWeight: 2,
                    }}
                    onClick={() => {
                      handleBusRouteClick()
                    }}
                  />
                ))
              : null}
            {/* {props.busStopsCollection
              ? props.busStopsCollection.map((busStop) => (
                  <Marker
                    key={busStop.stopKey}
                    position={{
                      lat: busStop.stopCoordinates.lat,
                      lng: busStop.stopCoordinates.lng,
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
          </GoogleMap>
        </Grid>
      </Grid>
    </div>
  ) : null
}

export default memo(TransportMap)
