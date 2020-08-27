import React, { useState, useEffect, Fragment } from "react"
import axios from "axios"
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
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core"
import Title from "./Title"
import LoadingTitle from "./LoadingTitle"

export default function GTFSTransportMapContainer() {
  // -----------------------------------------------------
  // STATE HOOKS
  // -----------------------------------------------------
  const [mapRef, setMapRef] = useState(null)
  const [mapZoom] = useState(parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM))
  const [mapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })
  const { isLoaded, mapLoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  const [busStopsCollection, setBusStopsCollection] = useState([])
  const [busShapesCollection, setBusShapesCollection] = useState([])

  const [busStopsCheckboxSelected, setBusStopsCheckbox] = useState(true)
  const [busShapesCheckboxSelected, setBusShapesCheckbox] = useState(true)

  const [busStopSelected, setBusStopSelected] = useState(null)
  const [busShapeSelected, setBusShapeSelected] = useState(null)

  const [dataLoading, setDataLoading] = useState(true)
  const [errorLoading, setLoadingError] = useState(false)
  const [errorLoadingMessage, setLoadingErrorMessage] = useState([])

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

  // Fetch bus stops data
  useEffect(() => {
    const stopsUrl = "http://localhost:5000/api/gtfsTransport/stops"
    const fetchBusStopsData = async () => {
      try {
        setDataLoading(true)
        const busStopsResult = await axios(stopsUrl)

        setBusStopsCollection(busStopsResult.data)
      } catch (err) {
        setLoadingError(true)
        setLoadingErrorMessage(err)
      }
    }
    fetchBusStopsData()
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
    const shapesUrl = "http://localhost:5000/api/gtfsTransport/shapes"
    const fetchBusShapesData = async () => {
      try {
        const busShapesResult = await axios(shapesUrl)

        setBusShapesCollection(busShapesResult.data)
      } catch (err) {
        setLoadingError(true)
        setLoadingErrorMessage(err)
      }
      setDataLoading(false)
    }
    fetchBusShapesData()
  }, [])

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
              <div style={{ width: "100%" }}>
                <Title>GTFS Transport Test</Title>
                {dataLoading ? <LoadingTitle>Loading...</LoadingTitle> : null}
                {errorLoading ? (
                  <LoadingTitle>
                    Error Loading...{errorLoadingMessage}
                  </LoadingTitle>
                ) : null}
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
                      checked={busShapesCheckboxSelected}
                      onChange={handleBusShapesCheckboxChange}
                      name="busShapesCheckbox"
                    />
                  }
                  label="Display Bus Trip Shapes"
                  labelPlacement="end"
                />
              </div>
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
                    <div style={polylineOptions.divStyle}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {busStopSelected.stop_name}
                      </Typography>
                    </div>
                  </InfoWindow>
                ) : null}
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
