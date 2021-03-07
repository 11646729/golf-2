import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  GoogleMap,
  useLoadScript,
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
  makeStyles,
} from "@material-ui/core"
import Title from "./Title"
import LoadingTitle from "./LoadingTitle"

const useStyles = makeStyles({
  headerSelection: {
    marginTop: 55,
    marginLeft: 20,
    width: "97%",
  },
})

export default function CoursesMapContainer() {
  const classes = useStyles()

  // -----------------------------------------------------
  // STATE HOOKS
  // -----------------------------------------------------
  const { isLoaded, mapLoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })
  const [mapRef, setMapRef] = useState(null)
  const [selected, setSelected] = useState(null)

  // -----------------------------------------------------
  // DATA HOOKS SECTION
  // -----------------------------------------------------
  const [golfCourses, setData] = useState([])
  const [loadingData, setLoadingData] = useState(false)
  const [loadingError, setLoadingError] = useState("")

  const getAllData = async () => {
    const source = axios.CancelToken.source()
    setLoadingData(true)
    await axios
      .get("http://localhost:5000/api/golf/course/", {
        cancelToken: source.token,
      })
      .then((response) => {
        setData(response.data)
        setLoadingData(false)
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log(error) // Component unmounted, request is cancelled
        } else {
          setLoadingError(error)
        }
      })
    return () => {
      source.cancel("Component unmounted, request is cancelled")
    }
  }

  useEffect(() => {
    getAllData()
  }, [])

  // -----------------------------------------------------
  // EVENT HANDLERS SECTION
  // -----------------------------------------------------
  // Store a reference to the google map instance in state
  const onLoadHandler = (map) => {
    setMapRef(map)
  }

  // Clear the reference to the google map instance
  const onUnmountHandler = () => {
    setMapRef(null)
  }

  // Now compute bounds of map to display
  if (mapRef != null && golfCourses.length !== 0) {
    const bounds = new window.google.maps.LatLngBounds()
    golfCourses.map((golfCourse) => {
      bounds.extend(golfCourse.coordinates)
      return bounds
    })
    mapRef.fitBounds(bounds)
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

  const mapZoom = parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM, 10)
  const mapCenter = {
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  }

  // -----------------------------------------------------
  // VIEW SECTION
  // -----------------------------------------------------
  const renderMap = () => (
    <div>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <div className={classes.headerSelection}>
            <Title>Golf Courses</Title>
            {loadingData ? <LoadingTitle>Loading...</LoadingTitle> : null}
            {loadingError ? (
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
            {golfCourses
              ? golfCourses.map((golfCourse) => (
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
  )

  if (mapLoadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
