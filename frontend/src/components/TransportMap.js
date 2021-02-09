import React, { useState, useEffect } from "react"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api"
import {
  CssBaseline,
  Grid,
  FormControlLabel,
  Checkbox,
  makeStyles,
} from "@material-ui/core"
import axios from "axios"

import Title from "./Title"
import LoadingTitle from "./LoadingTitle"

const useStyles = makeStyles({
  headerSelection: {
    marginTop: 55,
    marginLeft: 20,
  },
  // polyline1: {
  //   strokeColor: "#ff2343",
  //   strokeOpacity: "1.0",
  //   strokeWeight: 2,
  // },
  // polyline2: {
  //   strokeColor: "#0000ff",
  //   strokeOpacity: "1.0",
  //   strokeWeight: 2,
  // },
  divStyle: {
    background: `white`,
    border: `1px solid #ccc`,
    padding: 15,
  },
})

export default function TransportMapContainer() {
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

  // const [busStopSelected, setBusStopSelected] = useState(null)
  // const [busShapeSelected, setBusShapeSelected] = useState(null)

  const [busStopsCheckboxSelected, setBusStopsCheckbox] = useState(true)
  const [busRoutesCheckboxSelected, setBusRoutesCheckbox] = useState(true)

  // -----------------------------------------------------
  // DATA HOOKS SECTION
  // -----------------------------------------------------
  const [busRoutesCollection, setBusRoutesCollection] = useState([])
  const [busStopsCollection, setBusStopsCollection] = useState([])
  const [errorLoading, setLoadingError] = useState([])

  useEffect(() => {
    let isSubscribed = true

    axios
      .all([
        axios.get(
          "http://localhost:5000/api/translinkTransport/translinkRoutes"
        ),
        axios.get(
          "http://localhost:5000/api/translinkTransport/translinkStops"
        ),
      ])
      .then(
        axios.spread((routesResponse, stopsResponse) => {
          setBusRoutesCollection(routesResponse.data)
          setBusStopsCollection(stopsResponse.data)
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
        lat: busStop.stop_lat,
        lng: busStop.stop_lon,
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

  const handleBusStopsCheckboxChange = (event) => {
    setBusStopsCheckbox(event.target.checked)
  }

  const handleBusRoutesCheckboxChange = (event) => {
    setBusRoutesCheckbox(event.target.checked)
  }

  // const handleBusStopClick = (event) => {
  //   console.log(busStopSelected)
  // }

  // const handleBusRouteClick = (event) => {
  //   console.log(busRouteSelected)
  // }

  console.log(busStopsCollection.length) // 15680 stops

  // -----------------------------------------------------
  // VIEW SECTION
  // -----------------------------------------------------
  const renderMap = () => (
    <div>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <div className={classes.headerSelection}>
            <Title>Transport UI Test</Title>
            {!errorLoading ? (
              <LoadingTitle>Error Loading...</LoadingTitle>
            ) : null}
          </div>
          {/* <FormControlLabel
            style={{
              marginTop: "0px",
              marginLeft: "100px",
            }}
            control={
              <Checkbox
                color="primary"
                checked={busStopsCheckboxSelected}
                onChange={handleBusStopsCheckboxChange}
                name="homeCheckbox"
              />
            }
            label="Display Bus Stops"
            labelPlacement="end"
          />
          <FormControlLabel
            style={{
              marginTop: "0px",
              marginLeft: "100px",
            }}
            control={
              <Checkbox
                color="primary"
                checked={busRoutesCheckboxSelected}
                onChange={handleBusRoutesCheckboxChange}
                name="busRoutesCheckbox"
              />
            }
            label="Display Bus Routes"
            labelPlacement="end"
          /> */}
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
              ? // && busRoutesCheckboxSelected
                busRoutesCollection.map((busRoute) => (
                  <Polyline
                    key={busRoute.shapeId}
                    path={busRoute.shapeCoordinates}
                    options={{
                      strokeColor: busRoute.routeColor,
                      strokeOpacity: "1.0",
                      strokeWeight: 2,
                    }}
                    onClick={() => {
                      // setBusRouteSelected(busRoute)
                      // console.log(busRoute)
                      // handleBusRouteClick()
                    }}
                  />
                ))
              : null}
            {busStopsCollection
              ? // && busStopsCheckboxSelected
                busStopsCollection.map((busStop) => (
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
                      // setBusStopSelected(busStop)
                      // console.log(busStop)
                      // handleBusStopClick()
                    }}
                  />
                ))
              : null}
          </GoogleMap>
        </Grid>
      </Grid>
    </div>
  )

  if (mapLoadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
