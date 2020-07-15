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
} from "@material-ui/core"

export default function CoursesMapContainer() {
  // State Hooks
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })
  const [mapRef, setMapRef] = useState(null)
  const [mapZoom] = useState(
    parseFloat(process.env.REACT_APP_CRIMES_DEFAULT_ZOOM)
  )
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
  const url = "http://localhost:5000/api/golf/nearbyGolfCourses"

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
  }, [])

  // Now compute bounds of map to display
  if (mapRef && golfCourses != null) {
    const bounds = new window.google.maps.LatLngBounds()
    golfCourses.map((golfCourse) => {
      bounds.extend(golfCourse.coordinates)
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
                Golf Courses Dashboard
              </Typography>
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

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
