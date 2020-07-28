import React, { useState, useEffect, Fragment } from "react"
import axios from "axios"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api"
import {
  Typography,
  CssBaseline,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core"

export default function GTFSTransportMapContainer() {
  // State Hooks
  const [mapRef, setMapRef] = useState(null)
  const [mapZoom] = useState(
    parseFloat(process.env.REACT_APP_CRIMES_DEFAULT_ZOOM)
  )
  const [mapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })
  // const [selected, setSelected] = useState(null)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })
  const [busStopsCheckboxSelected, setBusStopsCheckbox] = useState(true)
  const [routesCheckboxSelected, setRoutesCheckbox] = useState(true)
  const [busStops, setBusStopsData] = useState([])
  const [reducedBusShapes, setReducedBusShapesData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState([])

  // Event Handlers
  const onLoadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map)
  }

  const onUnmountHandler = () => {
    setMapRef(null)
  }

  const handleBusStopsCheckboxChange = (event) => {
    setBusStopsCheckbox(event.target.checked)

    // if (event.target.checked === true) {
    //   setMapCenter({
    //     lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    //     lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
    //   })
    // } else {
    //   setMapCenter({
    //     lat: parseFloat(process.env.REACT_APP_ANDREA_HOME_LATITUDE),
    //     lng: parseFloat(process.env.REACT_APP_ANDREA_HOME_LONGITUDE),
    //   })
    // }
  }

  const handleRoutesCheckboxChange = (event) => {
    setRoutesCheckbox(event.target.checked)
  }

  // Now fetch bus stops data
  const stopsUrl = "http://localhost:5000/api/gtfsTransport/stops"

  // Fetch data - after componentHasUpdated
  useEffect(() => {
    let ignore = false
    const fetchBusStopsData = async () => {
      try {
        setLoading(true)
        setError({})
        const busStopsResult = await axios(stopsUrl)
        if (!ignore) setBusStopsData(busStopsResult.data)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }
    fetchBusStopsData()
    return () => {
      ignore = true
    }
  }, [])

  // Now compute bounds of map to display
  if (mapRef && busStops != null) {
    const bounds = new window.google.maps.LatLngBounds()
    busStops.map((busStop) => {
      const myLatLng = new window.google.maps.LatLng({
        lat: busStop.stop_lat,
        lng: busStop.stop_lon,
      })

      bounds.extend(myLatLng)
      return bounds
    })
    mapRef.fitBounds(bounds)
  }

  // Now fetch shapes data
  const shapesUrl = "http://localhost:5000/api/gtfsTransport/shapes"

  // Fetch data - after componentHasUpdated
  useEffect(() => {
    let ignore = false
    const fetchReducedBusShapesData = async () => {
      try {
        setLoading(true)
        setError({})
        const reducedBusShapesResult = await axios(shapesUrl)
        if (!ignore) setReducedBusShapesData(reducedBusShapesResult.data)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }
    fetchReducedBusShapesData()
    return () => {
      ignore = true
    }
  }, [])

  if (reducedBusShapes != null) {
    // const temp = reducedBusShapes[0]
    console.log(reducedBusShapes[0])
  }

  const renderMap = () => {
    return (
      <Fragment>
        <CssBaseline />
        <Grid container spacing={1}>
          <Container maxWidth="xl">
            <Grid item xs={12} sm={12} style={{ marginTop: 50 }}>
              <Typography
                style={{ display: "inline-block" }}
                component="h4"
                variant="h5"
                align="left"
                color="textPrimary"
                gutterBottom
              >
                GTFS Transport Test
              </Typography>
              <FormControlLabel
                style={{
                  marginTop: "0px",
                  marginLeft: "100px",
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
                  marginLeft: "100px",
                }}
                control={
                  <Checkbox
                    color="primary"
                    checked={routesCheckboxSelected}
                    onChange={handleRoutesCheckboxChange}
                    name="routeCheckbox"
                  />
                }
                label="Display Bus Routes"
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <GoogleMap
                mapContainerStyle={{
                  height: "600px",
                  width: "97%",
                  margin: 20,
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
                {reducedBusShapes && routesCheckboxSelected
                  ? reducedBusShapes.map((reducedBusShape) => (
                      <Polyline
                        key={reducedBusShape.shape_path}
                        path={reducedBusShape.shape_path}
                        options={{
                          strokeColor: "#ff2343",
                          strokeOpacity: "1.0",
                          strokeWeight: 2,
                          icons: [
                            {
                              icon: "hello",
                              offset: "0",
                              repeat: "10px",
                            },
                          ],
                        }}
                      />
                    ))
                  : null}

                {busStops && busStopsCheckboxSelected
                  ? busStops.map((busStop) => (
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
                        // onClick={() => {
                        //   setSelected(busStop)
                        // }}
                      />
                    ))
                  : null}
              </GoogleMap>
            </Grid>
          </Container>
        </Grid>
      </Fragment>
    )
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
