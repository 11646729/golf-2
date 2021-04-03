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
import {
  getGtfsRoutesData,
  getGtfsStopsData,
  getDisplayGtfsData,
} from "./Utilities"

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
})

function GTFSTransportMap() {
  const classes = useStyles()

  // -----------------------------------------------------
  // HOOKS
  // -----------------------------------------------------
  // const [busRoutesCollection, setBusRoutesCollection] = useState([])
  // const [busStopsCollection, setBusStopsCollection] = useState([])
  const [uniqueBusRoutesCollection, setUniqueBusRoutesCollection] = useState([])
  const [uniqueBusStopsCollection, setUniqueBusStopsCollection] = useState([])

  const [loadingData, setLoadingData] = useState(false)
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getGtfsRoutesData("http://localhost:5000/api/transport/groute/")
      .then((returnedData) =>
        isSubscribed ? setUniqueBusRoutesCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    getGtfsStopsData("http://localhost:5000/api/transport/gstop/")
      .then((returnedData) =>
        isSubscribed ? setUniqueBusStopsCollection(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  let busRouteAgencyName = ""
  if (uniqueBusRoutesCollection.length > 0) {
    busRouteAgencyName = uniqueBusRoutesCollection[0].agencyName
  }

  let displayBusRoutesCollection = []
  if (uniqueBusRoutesCollection.length > 0) {
    displayBusRoutesCollection = getDisplayGtfsData(uniqueBusRoutesCollection)
  }

  // <GTFSTransportMapView
  //   uniqueBusRoutesCollection={uniqueBusRoutesCollection}
  //   uniqueBusStopsCollection={uniqueBusStopsCollection}
  //   busRouteAgencyName={busRouteAgencyName}
  // />
  // }

  // function GTFSTransportMapView(props) {
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

export default React.memo(GTFSTransportMap)
