import React, { useState, useEffect, useCallback, memo } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CssBaseline,
  Grid,
  Button,
  Link,
  CardActions,
} from "@material-ui/core"

import Title from "./Title"
import LoadingTitle from "./LoadingTitle"
import { getGolfCoursesData } from "./Utilities"

// -------------------------------------------------------
// React Controller component
// -------------------------------------------------------
function GolfCoursesMap() {
  const [golfCoursesData, setGolfCoursesData] = useState([])
  const [loadingError, setLoadingError] = useState("")

  useEffect(() => {
    let isSubscribed = true

    getGolfCoursesData("http://localhost:5000/api/golf/nearbyGolfCourses")
      .then((returnedData) =>
        isSubscribed ? setGolfCoursesData(returnedData) : null
      )
      .catch((err) => (isSubscribed ? setLoadingError(err) : null))

    return () => (isSubscribed = false)
  }, [])

  return (
    <GolfCoursesMapView
      golfCoursesData={golfCoursesData}
      loadingError={loadingError}
    />
  )
}

// -------------------------------------------------------
// React View component
// -------------------------------------------------------
function GolfCoursesMapView(props) {
  const [map, setMap] = useState(null)
  const [selected, setSelected] = useState(null)

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  // Store a reference to the google map instance in state
  const onLoadHandler = useCallback(function callback(map) {
    setMap(map)
  }, [])

  // Clear the reference to the google map instance
  const onUnmountHandler = useCallback(function callback(map) {
    setMap(null)
  }, [])

  // Now compute bounds of map to display
  if (map != null && props.golfCoursesData.length !== 0) {
    const bounds = new window.google.maps.LatLngBounds()
    props.golfCoursesData.map((golfCourse) => {
      bounds.extend(golfCourse.coordinates)
      return bounds
    })
    map.fitBounds(bounds)
  }

  // -----------------------------------------------------
  // VIEW SECTION
  // -----------------------------------------------------
  const iconPin = {
    path:
      "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
    fillColor: "#78a32e",
    fillOpacity: 0.7,
    scale: 0.03, // to reduce the size of icons
    strokeColor: "#2f4024",
    strokeWeight: 1,
  }

  const mapZoom = parseInt(
    process.env.REACT_APP_MAP_DEFAULT_ZOOM,
    process.env.REACT_APP_MAP_DEFAULT_ZOOM
  )
  const mapCenter = {
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  }

  return isLoaded ? (
    <div>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <div
            style={{
              marginTop: 55,
              marginLeft: 20,
              width: "97%",
            }}
          >
            <Title>Golf Courses</Title>
            {props.loadingError ? (
              <LoadingTitle>Error Loading...</LoadingTitle>
            ) : null}
          </div>
        </Grid>
        <Grid item xs={12} sm={12}>
          <GoogleMap
            mapContainerStyle={{
              height: "600px",
              width: "97%",
              border: "1px solid #ccc",
              marginLeft: 20,
              marginRight: 10,
              marginBottom: 20,
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
            {props.golfCoursesData
              ? props.golfCoursesData.map((golfCourse) => (
                  <Marker
                    key={golfCourse.name}
                    position={golfCourse.coordinates}
                    icon={iconPin}
                    onClick={() => {
                      setSelected(golfCourse)
                    }}
                  />
                ))
              : null}

            {selected ? (
              <InfoWindow
                position={selected.coordinates}
                onCloseClick={() => {
                  setSelected(null)
                }}
              >
                <Card>
                  <CardMedia
                    style={{
                      height: 0,
                      paddingTop: "40%",
                      marginTop: "30",
                    }}
                    image={selected.photoUrl}
                    title={selected.photoTitle}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {selected.name}
                    </Typography>
                    <Typography component="p">
                      {selected.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="primary"
                      component={Link}
                      // to="/golfcoursesmap"
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </Grid>
      </Grid>
    </div>
  ) : null
}

export default memo(GolfCoursesMap)