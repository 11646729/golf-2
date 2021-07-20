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
import { getAllShapes, getAllStops } from "./Utilities"

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
function TransportMap() {
  const [busShapesCollection, setBusShapesCollection] = useState([])
  const [busStopsCollection, setBusStopsCollection] = useState([])
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    // This function does some reduction & reformatting
    getAllShapes("http://localhost:5000/api/transport/shapes/")
      .then((returnedData) =>
        isSubscribed ? setBusShapesCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getAllStops("http://localhost:5000/api/transport/stops/")
      .then((returnedData) =>
        isSubscribed ? setBusStopsCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  console.log(busStopsCollection)

  return (
    <TransportMapView
      busShapesCollection={busShapesCollection}
      busStopsCollection={busStopsCollection}
      loadingError={loadingError}
    />
  )
}

// -------------------------------------------------------
// React View component
// -------------------------------------------------------
function TransportMapView(props) {
  const [map, setMap] = useState(null)
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

  // -----------------------------------------------------
  // EVENT HANDLERS SECTION
  // -----------------------------------------------------
  // Store a reference to the google map instance
  const onLoadHandler = (map) => {
    setMap(map)
  }

  // Clear the reference to the google map instance
  const onUnmountHandler = () => {
    setMap(null)
  }

  const handleBusStopClick = (event) => {
    console.log(event)
  }

  const handleBusShapeClick = (event) => {
    console.log(event)
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
          </GoogleMap>
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* <RouteSelectionPanel
            busRoutesCollection={props.uniqueBusRoutesCollection}
            busStopsCollection={props.busStopsCollection}
            busRoutesSelectedAgency={busRouteAgencyName}
          /> */}
        </Grid>
      </Grid>
    </div>
  ) : null
}

export default memo(TransportMap)
