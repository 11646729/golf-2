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

export default function TransportMapContainer() {
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
  const [homeCheckboxSelected, setHomeCheckbox] = useState(true)
  const [layerCheckboxSelected, setLayerCheckbox] = useState(true)
  const [busStops, setData] = useState([])
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

  const handleHomeCheckboxChange = (event) => {
    setHomeCheckbox(event.target.checked)

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

  const handleLayerCheckboxChange = (event) => {
    setLayerCheckbox(event.target.checked)
  }

  // Fetch data - after componentHasUpdated
  const url = "http://localhost:5000/api/transport/stopsstations"

  // Now fetch bus stops data
  useEffect(() => {
    let ignore = false
    const fetchData = async () => {
      try {
        setLoading(true)
        setError({})
        const result = await axios(url)
        if (!ignore) setData(result.data)
      } catch (err) {
        setError(err)
      }
      setLoading(false)
    }
    fetchData()
    return () => {
      ignore = true
    }
  }, [])

  // Now compute bounds of map to display
  if (mapRef && busStops != null) {
    const bounds = new window.google.maps.LatLngBounds()
    busStops.map((busStop) => {
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
                    checked={homeCheckboxSelected}
                    onChange={handleHomeCheckboxChange}
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
                    checked={layerCheckboxSelected}
                    onChange={handleLayerCheckboxChange}
                    name="homeCheckbox"
                  />
                }
                label="Display Geojson Test"
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
                {layerCheckboxSelected ? (
                  <Polyline
                    path={[
                      {
                        lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
                        lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
                      },
                      { lat: 62.100833, lng: 7.203439 },
                      { lat: -36.73590441, lng: 144.25178198 },
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

                {busStops && homeCheckboxSelected
                  ? busStops.map((busStop) => (
                      <Marker
                        key={busStop.stop_id}
                        position={busStop.stop_coordinates}
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
