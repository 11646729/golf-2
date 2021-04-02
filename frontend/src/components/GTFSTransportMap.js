import React, { useState, useEffect } from "react"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api"
import { CssBaseline, Grid, makeStyles } from "@material-ui/core"

import Title from "./Title"
import LoadingTitle from "./LoadingTitle"
import RouteSelectionPanel from "./RouteSelectionPanel"
import { removeDuplicates, removeFalse, getGtfsData } from "./Utilities"

const useStyles = makeStyles({
  divStyle: {
    background: "white",
    border: "1px solid #ccc",
    padding: 15,
  },
  headerStyle: {
    marginTop: 55,
    marginLeft: 20,
    width: "97%",
  },
  containerStyle: {
    height: "600px",
    width: "97%",
    border: "1px solid #ccc",
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20,
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

  // -----------------------------------------------------
  // HOOKS
  // -----------------------------------------------------
  const [busRoutesCollection, setBusRoutesCollection] = useState([])
  const [busStopsCollection, setBusStopsCollection] = useState([])
  // const [uniqueBusRoutesCollection, setUniqueBusRoutesCollection] = useState([])
  // const [uniqueBusStopsCollection, setUniqueBusStopsCollection] = useState([])

  const [loadingData, setLoadingData] = useState(false)
  const [loadingError, setLoadingError] = useState("")

  const [busStopSelected, setBusStopSelected] = useState(null)
  const [busRouteSelected, setBusRouteSelected] = useState(null)

  useEffect(() => {
    let isSubscribed = true

    getGtfsData("http://localhost:5000/api/transport/groute/")
      .then((temps) => (isSubscribed ? setBusRoutesCollection(temps) : null))
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getGtfsData("http://localhost:5000/api/transport/gstop/")
      .then((temps) => (isSubscribed ? setBusStopsCollection(temps) : null))
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    // removeDuplicates(busRoutesCollection, "routeNumber").then((temps) =>
    //   isSubscribed ? setUniqueBusRoutesCollection(temps) : null
    // )

    // removeDuplicates(busStopsCollection, "coordsString").then((temps) =>
    //   isSubscribed ? setUniqueBusStopsCollection(temps) : null
    // )

    return () => (isSubscribed = false)
  }, [])

  let busRouteAgencyName = ""
  if (busRoutesCollection.length > 0) {
    busRouteAgencyName = busRoutesCollection[0].agencyName
  }

  // Remove Duplicates from the busRoutesCollection array
  let uniqueBusRoutesCollection = removeDuplicates(
    busRoutesCollection,
    "routeNumber"
  )

  // Remove Duplicates from the busStopsCollection array
  let uniqueBusStopsCollection = removeDuplicates(
    busStopsCollection,
    "coordsString"
  )

  let displayBusRoutesCollection = removeFalse(
    busRoutesCollection,
    "routeVisible",
    true
  )

  // Now compute bounds of map to display
  if (mapRef && uniqueBusStopsCollection != null) {
    const bounds = new window.google.maps.LatLngBounds()
    uniqueBusStopsCollection.map((busStop) => {
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
  //     // console.log(busStopSelected)
  //     // setBusStopSelected(busStop)
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
          <div className={classes.headerStyle}>
            <Title>GTFS Transport UI Test</Title>
            {loadingData ? <LoadingTitle>Loading...</LoadingTitle> : null}
            {loadingError ? (
              <LoadingTitle>Error Loading...</LoadingTitle>
            ) : null}
          </div>
        </Grid>
        <Grid item xs={12} sm={9}>
          <GoogleMap
            mapContainerStyle={
              // classes.containerStyle
              {
                height: "600px",
                width: "97%",
                border: "1px solid #ccc",
                marginLeft: 20,
                marginRight: 10,
                marginBottom: 20,
              }
            }
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
            {displayBusRoutesCollection
              ? displayBusRoutesCollection.map((busRoute) => (
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
            {/* {uniqueBusStopsCollection
              ? uniqueBusStopsCollection.map((busStop) => (
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
            busRoutesCollection={uniqueBusRoutesCollection}
            busRoutesSelectedAgency={busRouteAgencyName}
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
