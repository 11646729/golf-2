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

  const [busStopsCollection, setBusStopsCollection] = useState([])
  const [busShapesCollection, setBusShapesCollection] = useState([])

  const [busStopsCheckboxSelected, setBusStopsCheckbox] = useState(true)
  const [busShapesCheckboxSelected, setBusShapesCheckbox] = useState(true)

  const [busStopSelected, setBusStopSelected] = useState(null)
  const [busShapeSelected, setBusShapeSelected] = useState(null)

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

  const handleBusShapesCheckboxChange = (event) => {
    setBusShapesCheckbox(event.target.checked)
  }

  const handleBusStopClick = (event) => {
    console.log(busStopSelected)
  }

  const handleBusShapeClick = (event) => {
    console.log(busShapeSelected)
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
        if (!ignore) setBusStopsCollection(result.data)
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

  // console.log(busStopsCollection)

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

  // Now fetch shapes data
  const shapesUrl = "http://localhost:5000/api/transport/translinkshapes"

  // Fetch data - after componentHasUpdated
  useEffect(() => {
    let ignore = false
    const fetchBusShapesData = async () => {
      try {
        setDataLoading(true)
        setLoadingError({})
        const busShapesResult = await axios(shapesUrl)
        if (!ignore) setBusShapesCollection(busShapesResult.data)
      } catch (err) {
        setLoadingError(err)
      }
      setDataLoading(false)
    }
    fetchBusShapesData()
    return () => {
      ignore = true
    }
  }, [])

  console.log(busShapesCollection)

  const polylineOptions = {
    polyline1: {
      strokeColor: "#ff2343",
      strokeOpacity: "1.0",
      strokeWeight: 2,
    },
    polyline2: {
      strokeColor: "#0000ff",
      strokeOpacity: "1.0",
      strokeWeight: 2,
    },
    divStyle: {
      background: `white`,
      border: `1px solid #ccc`,
      padding: 15,
    },
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
                    checked={busShapesCheckboxSelected}
                    onChange={handleBusShapesCheckboxChange}
                    name="busShapesCheckbox"
                  />
                }
                label="Display Bus Shapes"
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
                {busShapesCollection
                  ? busShapesCollection.map((busShape) => (
                      <Polyline
                        key={busShape.shapeId}
                        path={busShape.shapeCoordinates}
                        options={polylineOptions.polyline1}
                        onClick={() => {
                          setBusShapeSelected(busShape)
                          console.log(busShape)
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
                          console.log(busStop)
                          // handleBusStopClick()
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
