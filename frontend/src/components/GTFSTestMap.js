import React, { useState, useEffect, Fragment } from "react"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api"
import {
  Typography,
  CssBaseline,
  Grid,
  FormControlLabel,
  Checkbox,
  Paper,
  makeStyles,
} from "@material-ui/core"
import Title from "./Title"
import LoadingTitle from "./LoadingTitle"
import getGFTSTransportStopsDataPoints from "./getGFTSTransportStopsData"
import getGFTSTransportShapesData from "./getGTFSTransportShapesData"
import RouteListItem from "./RouteListItem"

const useStyles = makeStyles({
  // polyline1: {
  //   strokeColor: "#ff2343",
  //   strokeOpacity: "1.0",
  //   strokeWeight: 2,
  // },
  polyline2: {
    strokeColor: "#0000ff",
    strokeOpacity: "1.0",
    strokeWeight: 2,
  },
  divStyle: {
    background: "white",
    border: "1px solid #ccc",
    padding: 15,
  },
  headerSelection: {
    marginTop: 55,
    marginLeft: 20,
  },
  routeSelection: {
    marginRight: 20,
    marginBottom: 50,
    height: "600px",
    square: true,
    border: "1px solid #ccc",
    backgroundColor: "none", // "red",
  }
})

export default function GTFSTestMapContainer() {
  const classes = useStyles()

  // -----------------------------------------------------
  // STATE HOOKS
  // -----------------------------------------------------
  const [mapRef, setMapRef] = useState(null)
  const newLocal = parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM)
  const [mapZoom] = useState(newLocal)
  const [mapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })
  const { isLoaded, mapLoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  const [busStopsCheckboxSelected, setBusStopsCheckbox] = useState(true)
  const [busShapesCheckboxSelected, setBusShapesCheckbox] = useState(true)

  const [busStopSelected, setBusStopSelected] = useState(null)
  const [busShapeSelected, setBusShapeSelected] = useState(null)

  // -----------------------------------------------------
  // DATA HOOKS SECTION
  // -----------------------------------------------------
  const [busStopsCollection, setBusStopsCollection] = useState([])
  const [busShapesCollection, setBusShapesCollection] = useState([])
  const [errorLoading, setLoadingError] = useState([])

  // Fetch bus stops data
  useEffect(() => {
    let isSubscribed = true

    getGFTSTransportStopsDataPoints()
      .then((busStopsResult) =>
        isSubscribed ? setBusStopsCollection(busStopsResult) : null
      )
      .catch((errorLoading) =>
        isSubscribed ? setLoadingError(errorLoading) : null
      )

    return () => (isSubscribed = false)
  }, [])

  // Now compute bounds of map to display
  if (mapRef && busStopsCollection != null) {
    const bounds = new window.google.maps.LatLngBounds()
    busStopsCollection.map((busStop) => {
      const myLatLng = new window.google.maps.LatLng({
        lat: busStop.stop_lat,
        lng: busStop.stop_lon,
      })
      bounds.extend(myLatLng)
      return bounds
    })
    mapRef.fitBounds(bounds)
  }

  // Fetch shapes data
  useEffect(() => {
    let isSubscribed = true

    getGFTSTransportShapesData()
      .then((busShapesResult) =>
        isSubscribed ? setBusShapesCollection(busShapesResult) : null
      )
      .catch((errorLoading) =>
        isSubscribed ? setLoadingError(errorLoading) : null
      )

    return () => (isSubscribed = false)
  }, [])

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

  const handleBusStopsCheckboxChange = (event) => {
    setBusStopsCheckbox(event.target.checked)
  }

  const handleBusShapesCheckboxChange = (event) => {
    setBusShapesCheckbox(event.target.checked)
  }

  // const handleBusStopClick = (event) => {
  //   console.log(busStopSelected)
  // }

  // const handleBusShapeClick = (event) => {
  //   console.log(busShapeSelected)
  // }

  // -----------------------------------------------------
  // VIEW SECTION
  // -----------------------------------------------------
  const renderMap = () => {
    return (
      <Fragment>
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
                marginBottom: 50
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
              {busShapesCollection
                ? busShapesCollection.map((busShape) => (
                  <Polyline
                    key={busShape.shapeId}
                    path={busShape.shapeCoordinates}
                    // options={classes.polyline1}
                    options={{ strokeColor: "#ff2343" }}
                    onClick={() => {
                      setBusShapeSelected(busShape)
                      // console.log(busShape)
                      // handleBusShapeClick()
                    }}
                  />
                ))
                : null}
              {busStopsCollection && busStopsCheckboxSelected
                ? busStopsCollection.map((busStop) => (
                  <Marker
                    key={busStop.stop_id}
                    position={{
                      lat: busStop.stop_lat,
                      lng: busStop.stop_lon,
                    }}
                    icon={{
                      url:
                        "http://maps.google.com/mapfiles/ms/icons/blue.png",
                    }}
                    onClick={() => {
                      setBusStopSelected(busStop)
                      // console.log(busStop)
                      // handleBusStopClick()
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
              ) : null}
            </GoogleMap>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Paper className={classes.routeSelection}>
              {!errorLoading ? (
                <LoadingTitle>Error Loading...</LoadingTitle>
              ) : null}
              <FormControlLabel
                style={{
                  marginTop: "10px",
                  marginLeft: "20px",
                }}
                control={
                  <Checkbox
                    color="primary"
                    checked={busStopsCheckboxSelected}
                    onChange={handleBusStopsCheckboxChange}
                    name="busStopsCheckbox"
                  />
                }
                label="Display Bus Stops"
                labelPlacement="end"
              />
              <FormControlLabel
                style={{
                  marginTop: "0px",
                  marginLeft: "20px",
                }}
                control={
                  <Checkbox
                    color="primary"
                    checked={busShapesCheckboxSelected}
                    onChange={handleBusShapesCheckboxChange}
                    name="busShapesCheckbox"
                  />
                }
                label="Display Bus Trip Shapes"
                labelPlacement="end"
              />
              <RouteListItem />
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    )
  }

  if (mapLoadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
