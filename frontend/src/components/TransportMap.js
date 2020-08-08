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
  Box,
} from "@material-ui/core"

export default function TransportMapContainer() {
  // State Hooks
  const [mapRef, setMapRef] = useState(null)
  const { isLoaded, mapLoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })
  const [mapZoom] = useState(parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM))
  const [mapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })
  const [busStopsCheckboxSelected, setBusStopsCheckbox] = useState(true)
  const [routesCheckboxSelected, setRoutesCheckbox] = useState(true)
  const [busStopsData, setData] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const [errorLoading, setLoadingError] = useState([])

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
  }

  const handleRoutesCheckboxChange = (event) => {
    setRoutesCheckbox(event.target.checked)
  }

  // Fetch data - after componentHasUpdated
  const url = "http://localhost:5000/api/transport/translinkstops"

  // Now fetch bus stops data
  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      try {
        // setDataLoading(true)
        setLoadingError({})
        const result = await axios(url)
        if (!ignore) setData(result.data)
      } catch (err) {
        setLoadingError(err)
      }
      setDataLoading(false)
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [])

  // Now compute bounds of map to display
  if (mapRef && busStopsData != null) {
    const bounds = new window.google.maps.LatLngBounds()
    busStopsData.map((busStop) => {
      bounds.extend(busStop.stop_coordinates)
      return bounds
    })
    mapRef.fitBounds(bounds)
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
                Transport Dashboard
              </Typography>
              {dataLoading ? (
                <Box component="div" display="inline" variant="h4" p={1} m={1}>
                  Loading...
                </Box>
              ) : null}
              {!errorLoading ? (
                <Box component="div" display="inline" variant="h4" p={1} m={1}>
                  Error Loading...
                </Box>
              ) : null}
              <FormControlLabel
                // style={styles.displayHomeLocationCheckBox}
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
                {routesCheckboxSelected ? (
                  <Polyline
                    path={[
                      { lat: 54.596678, lng: -5.828273 },
                      { lat: 54.596379, lng: -5.82815 },
                      { lat: 54.596278, lng: -5.827985 },
                      { lat: 54.596211, lng: -5.827803 },
                      { lat: 54.596147, lng: -5.827729 },
                      { lat: 54.595872, lng: -5.827418 },
                      { lat: 54.595434, lng: -5.827055 },
                      { lat: 54.595263, lng: -5.827048 },
                      { lat: 54.595197, lng: -5.826881 },
                      { lat: 54.595114, lng: -5.826762 },
                      { lat: 54.594722, lng: -5.826412 },
                      { lat: 54.594577, lng: -5.826357 },
                      { lat: 54.594451, lng: -5.826364 },
                      { lat: 54.594237, lng: -5.826453 },
                      { lat: 54.594197, lng: -5.826254 },
                      { lat: 54.594146, lng: -5.825916 },
                      { lat: 54.594111, lng: -5.825453 },
                      { lat: 54.594089, lng: -5.824743 },
                      { lat: 54.594482, lng: -5.824598 },
                      { lat: 54.594688, lng: -5.824556 },
                      { lat: 54.594859, lng: -5.824547 },
                      { lat: 54.595121, lng: -5.824626 },
                      { lat: 54.595293, lng: -5.824725 },
                      { lat: 54.595503, lng: -5.824884 },
                      { lat: 54.596173, lng: -5.825653 },
                      { lat: 54.597318, lng: -5.826892 },
                      { lat: 54.597682, lng: -5.827105 },
                      { lat: 54.597929, lng: -5.827355 },
                      { lat: 54.59811, lng: -5.827423 },
                      { lat: 54.598332, lng: -5.827272 },
                    ]}
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
                ) : null}

                {busStopsData && busStopsCheckboxSelected
                  ? busStopsData.map((busStop) => (
                      <Marker
                        key={busStop.stop_id}
                        position={busStop.stop_coordinates}
                        icon={{
                          url:
                            "http://maps.google.com/mapfiles/ms/icons/blue.png",
                        }}
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

  if (mapLoadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
