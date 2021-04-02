import React, { useState } from "react"
import { CssBaseline, Grid, makeStyles } from "@material-ui/core"
import {
  GoogleMap,
  Marker,
  Polyline,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api"
import Title from "./Title"
import LoadingTitle from "./LoadingTitle"
import RouteSelectionPanel from "./RouteSelectionPanel"

const useStyles = makeStyles({
  headerStyle: {
    marginTop: 55,
    marginLeft: 20,
    width: "97%",
  },
})

function GTFSTransportMapTest(
  allCollections,
  busRouteAgencyName,
  loadingData,
  loadingError
) {
  // console.log("All Collection: ", allCollections)

  let uniqueBusStopsCollection = allCollections.allCollections[0]
  let uniqueBusRoutesCollection = allCollections.allCollections[1]
  let displayBusRoutesCollection = allCollections.allCollections[2]

  console.log("Unique Bus Stops: ", uniqueBusStopsCollection)

  const classes = useStyles()

  const containerStyle = {
    height: "600px",
    width: "97%",
    border: "1px solid #ccc",
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20,
  }

  // -----------------------------------------------------
  // STATE HOOKS
  // -----------------------------------------------------
  const [busStopSelected, setBusStopSelected] = useState(null)
  const [busRouteSelected, setBusRouteSelected] = useState(null)

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

  const onLoadHandler = React.useCallback(function callback(
    mapRef,
    uniqueBusStopsCollection
  ) {
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
  },
  [])

  const onUnmountHandler = React.useCallback(function callback(map) {
    setMapRef(null)
  }, [])

  const handleBusRouteClick = (event) => {
    console.log(event)
    // console.log(busRouteSelected)
    // setBusRouteSelected(busRoute)
  }

  const handleBusStopClick = (event) => {
    console.log(event)
    // console.log(busStopSelected)
    // setBusStopSelected(busStop)
  }

  if (displayBusRoutesCollection > 0)
    // console.log(uniqueBusStopsCollection)
    console.log(displayBusRoutesCollection)

  return isLoaded ? (
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
            mapContainerStyle={containerStyle}
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
            {/* {displayBusRoutesCollection
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
              : null} */}
            {uniqueBusStopsCollection
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
              : null}
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
            busRoutesCollection={uniqueBusRoutesCollection}
            busRoutesSelectedAgency={busRouteAgencyName}
            // busStopsCollection={busStopsCollection}
          /> */}
        </Grid>
      </Grid>
    </div>
  ) : (
    <></>
  )
}

export default React.memo(GTFSTransportMapTest)