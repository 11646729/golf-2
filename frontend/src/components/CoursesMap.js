import React, { useState, useEffect, Fragment } from "react"
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
  Container,
  Grid,
  Button,
  Link,
  CardActions,
  Box,
} from "@material-ui/core"

export default function CoursesMapContainer() {
  // State Hooks
  const { isLoaded, mapLoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })
  const [mapRef, setMapRef] = useState(null)
  const [mapZoom] = useState(parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM))
  const [mapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })
  const [golfCourses, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState([])
  const [selected, setSelected] = useState(null)

  // Event Handlers
  const onLoadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map)
  }

  const onUnmountHandler = () => {
    setMapRef(null)
  }

  // Fetch data - after componentHasUpdated
  let url = "http://localhost:5000/api/golf/nearbyGolfCourses"

  // Now fetch golf courses data
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
  }, [url])

  // Now compute bounds of map to display
  if (mapRef && golfCourses != null) {
    const bounds = new window.google.maps.LatLngBounds()
    golfCourses.map((golfCourse) => {
      bounds.extend(golfCourse.coordinates)
      return bounds
    })
    mapRef.fitBounds(bounds)
  }

  var iconPin = {
    path:
      "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
    strokeColor: "green",
    fillColor: "#78a32e",
    fillOpacity: 1,
    scale: 0.03, //to reduce the size of icons
  }

  const renderMap = () => {
    return (
      <Fragment>
        <CssBaseline />
        <Grid container spacing={1}>
          <Container maxWidth="xl">
            <Grid item xs={12} sm={12} style={{ marginTop: 50 }}>
              <div style={{ width: "100%" }}>
                <Typography
                  component="div"
                  display="inline"
                  p={1}
                  m={1}
                  variant="h5"
                  align="left"
                  color="textPrimary"
                  gutterBottom
                >
                  Golf Courses Dashboard
                </Typography>
                <Box component="div" display="inline" variant="h4" p={1} m={1}>
                  Loading...
                </Box>
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
                          // paddingTop: "56.25%", // 16:9,
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
