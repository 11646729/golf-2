import React, { useState, useEffect } from "react"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api"
import { Typography, CssBaseline, Grid, makeStyles } from "@material-ui/core"
import axios from "axios"

import Title from "./Title"
import LoadingTitle from "./LoadingTitle"
import RouteSelectionPanel from "./RouteSelectionPanel"

const useStyles = makeStyles({
  divStyle: {
    background: "white",
    border: "1px solid #ccc",
    padding: 15,
  },
  headerSelection: {
    marginTop: 55,
    marginLeft: 20,
  },
})

export default function GTFSTransportMapContainer() {
  const classes = useStyles()

  // -----------------------------------------------------
  // STATE HOOKS
  // -----------------------------------------------------
  const [mapRef, setMapRef] = useState(null)
  const newLocal = parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM, 10)
  const [mapZoom] = useState(newLocal)
  const [mapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })
  const { isLoaded, mapLoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  const [busStopSelected, setBusStopSelected] = useState(null)
  const [busRouteSelected, setBusRouteSelected] = useState(null)

  // -----------------------------------------------------
  // DATA HOOKS SECTION
  // -----------------------------------------------------
  const [busRoutesCollection, setBusRoutesCollection] = useState([])
  const [busStopsCollection, setBusStopsCollection] = useState([])
  const [uniqueBusRoutesCollection, setUniqueBusRoutesCollection] = useState([])
  const [errorLoading, setLoadingError] = useState([])

  useEffect(() => {
    let isSubscribed = true

    axios
      .all([
        axios.get("http://localhost:5000/api/gtfsTransport/gtfsRoutes"),
        axios.get("http://localhost:5000/api/gtfsTransport/gtfsStops"),
        axios.get(
          "http://localhost:5000/api/gtfsTransport/gtfsPanelListRoutes"
        ),
      ])
      .then(
        axios.spread((routesResponse, stopsResponse, uniqueRoutesResponse) => {
          setBusRoutesCollection(routesResponse.data)
          setBusStopsCollection(stopsResponse.data)
          setUniqueBusRoutesCollection(uniqueRoutesResponse.data)
        })
      )
      .catch((errors) => {
        setLoadingError(errors)
        // console.log(errorLoading)
      })

    // isSubscribed = false
    // return isSubscribed
    return () => (isSubscribed = false)
  }, [])

  // Now compute bounds of map to display
  if (mapRef && busStopsCollection != null) {
    const bounds = new window.google.maps.LatLngBounds()
    busStopsCollection.map((busStop) => {
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

  // const handleBusStopClick = (event) => {
  //   console.log(event)
  //   // console.log(busStopSelected)
  //   // setBusStopSelected(busStop)
  // }

  const handleBusRouteClick = (event) => {
    console.log(event)
    // console.log(busRouteSelected)
    // setBusRouteSelected(busRoute)
  }

  // -----------------------------------------------------
  // VIEW SECTION
  // -----------------------------------------------------
  const renderMap = () => (
    <div>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <div className={classes.headerSelection}>
            <Title>GTFS Transport UI Test</Title>
            {!errorLoading ? (
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
            {busRoutesCollection
              ? busRoutesCollection.map((busRoute) => (
                  <Polyline
                    key={busRoute.routeKey}
                    path={busRoute.routeCoordinates}
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
            {/* {busStopsCollection
              ? busStopsCollection.map((busStop) => (
                  <Marker
                    key={busStop.stopKey}
                    position={{
                      lat: busStop.shapeCoordinates.lat,
                      lng: busStop.shapeCoordinates.lng,
                    }}
                    icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: 2,
                    }}
                    onClick={() => {
                      handleBusStopClick()
                    }}
                  />
                ))
              : null} */}
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
            ) : null}
          </GoogleMap>
        </Grid>
        <Grid item xs={12} sm={3}>
          <RouteSelectionPanel
            busRoutesCollection={uniqueBusRoutesCollection}
            // busStopsCollection={busStopsCollection}
          />
        </Grid>
      </Grid>
    </div>
  )

  if (mapLoadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
