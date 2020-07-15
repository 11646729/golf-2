import React, { useState, useEffect, Fragment } from "react"
import useSwr from "swr"
import axios from "axios"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import {
  Typography,
  CssBaseline,
  Container,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function TransportMapContainer() {
  // State
  const [mapRef, setMapRef] = useState(null)
  const [mapZoom] = useState(
    parseFloat(process.env.REACT_APP_CRIMES_DEFAULT_ZOOM)
  )
  const [mapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })
  const [selected, setSelected] = useState(null)
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })
  const [busStops, setData] = useState([])
  const [homeCheckbox, setHomeCheckbox] = useState(true)

  // This line initialises the data array
  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:5000/api/transport/stopsstations"

      // const { data, error } = useSwr(url, { fetcher })
      // const busStops = data && !error ? data : []
      // setData(busStops)

      const result = await axios(url)
      setData(result.data)
    }
    fetchData()
  }, [])

  const styles = {
    displayMap: {
      height: "600px",
      width: "97%",
      margin: 20,
    },
    media: {
      height: 0,
      // paddingTop: "56.25%", // 16:9,
      paddingTop: "40%",
      marginTop: "30",
    },
    displayHomeLocationCheckBox: {
      marginTop: "0px",
      marginLeft: "100px",
    },
  }

  const options = {
    // mapTypeId: "hybrid",
    disableDefaultUI: true,
    zoomControl: true,
  }

  console.log(busStops.length)

  const onLoadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map)
  }

  const onUnmountHandler = () => {
    setMapRef(null)
  }

  // Now compute bounds of map to display
  if (busStops != null) {
    // get map bounds
    if (mapRef) {
      const bounds = new window.google.maps.LatLngBounds()
      busStops.map((busStop) => {
        bounds.extend(busStop.stop_coordinates)
        return bounds
      })
      mapRef.fitBounds(bounds)
    }
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
              <FormControlLabel
                style={styles.displayHomeLocationCheckBox}
                control={
                  <Checkbox
                    color="primary"
                    checked={homeCheckbox}
                    onChange={handleHomeCheckboxChange}
                    name="homeCheckbox"
                  />
                }
                label="Display Bus Stops"
                labelPlacement="end"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <GoogleMap
                mapContainerStyle={styles.displayMap}
                center={mapCenter}
                zoom={mapZoom}
                options={options}
                onLoad={onLoadHandler}
                onUnmount={onUnmountHandler}
              >
                {busStops
                  ? busStops.map((busStop) => (
                      <Marker
                        key={busStop.stop_id}
                        position={busStop.stop_coordinates}
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
