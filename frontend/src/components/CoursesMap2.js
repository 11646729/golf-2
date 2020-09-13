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
import Title from "./Title"
import LoadingTitle from "./LoadingTitle"

export default function CoursesMapContainer() {
  return <CoursesMapViewController />
}

function CoursesMapViewController() {
  // -----------------------------------------------------
  // STATE HOOKS
  // -----------------------------------------------------
  const { isLoaded, mapLoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })
  // const [mapRef, setMapRef] = useState(null)
  const [selected, setSelected] = useState(null)

  // -----------------------------------------------------
  // DATA HOOKS SECTION
  // -----------------------------------------------------
  const [golfCourses, setData] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const [errorLoading, setLoadingError] = useState(false)
  const [errorLoadingMessage, setLoadingErrorMessage] = useState([])

  // Now fetch golf courses data
  useEffect(() => {
    let url = "http://localhost:5000/api/golf/nearbyGolfCourses"

    const fetchData = async () => {
      try {
        setDataLoading(true)
        const result = await axios(url)

        setData(result.data)
      } catch (err) {
        setLoadingError(true)
        setLoadingErrorMessage(err)
      }
      setDataLoading(false)
    }
    fetchData()
  }, [])

  // -----------------------------------------------------
  // EVENT HANDLERS SECTION
  // -----------------------------------------------------
  // Store a reference to the google map instance in state
  // let onLoadHandler = (map) => {
  //   setMapRef(map)
  // }

  // Clear the reference to the google map instance
  // let onUnmountHandler = () => {
  //   setMapRef(null)
  // }

  // Now compute bounds of map to display
  // if (mapRef && golfCourses != null) {
  //   const bounds = new window.google.maps.LatLngBounds()
  //   golfCourses.map((golfCourse) => {
  //     bounds.extend(golfCourse.coordinates)
  //     return bounds
  //   })
  //   mapRef.fitBounds(bounds)
  // }

  if (mapLoadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded
    ? CoursesMapView(
        golfCourses,
        dataLoading,
        errorLoading,
        errorLoadingMessage
      )
    : null
}

// -----------------------------------------------------
// VIEW SECTION
// -----------------------------------------------------
function CoursesMapView(
  golfCourses,
  dataLoading,
  errorLoading,
  errorLoadingMessage
) {
  // let [mapRef, setMapRef] = useState()

  // console.log(golfCourses)

  var iconPin = {
    path:
      "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
    fillColor: "#78a32e",
    fillOpacity: 0.7,
    scale: 0.03, //to reduce the size of icons
    strokeColor: "#2f4024",
    strokeWeight: 1,
  }

  // Store a reference to the google map instance in state
  // let onLoadHandler = (map) => {
  //   setMapRef(map)
  //   if (mapRef && golfCourses != null) {
  //     const bounds = new window.google.maps.LatLngBounds()
  //     golfCourses.map((golfCourse) => {
  //       bounds.extend(golfCourse.coordinates)
  //       return bounds
  //     })
  //     mapRef.fitBounds(bounds)
  //   }
  // }

  // Clear the reference to the google map instance
  // let onUnmountHandler = () => {
  //   setMapRef(null)
  // }

  let mapZoom = parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM)
  let mapCenter = {
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  }

  return (
    <Fragment>
      <CssBaseline />
      <Grid container spacing={1}>
        <Container maxWidth="xl">
          <Grid item xs={12} sm={12} style={{ marginTop: 50 }}>
            <div style={{ width: "100%" }}>
              <Title>Nearby Golf Courses</Title>
              {dataLoading ? <LoadingTitle>Loading...</LoadingTitle> : null}
              {errorLoading ? (
                <LoadingTitle>
                  Error Loading...{errorLoadingMessage}
                </LoadingTitle>
              ) : null}
            </div>
          </Grid>
          <Grid item xs={12} sm={12}>
            <GoogleMap
              mapContainerStyle={{
                height: "600px",
                width: "97%",
                margin: 20,
              }}
              zoom={mapZoom}
              center={mapCenter}
              options={{
                // mapTypeId: "hybrid",
                disableDefaultUI: true,
                zoomControl: true,
              }}
              // onLoad={onLoadHandler}
              // onUnmount={onUnmountHandler}
            >
              {/* {golfCourses
                ? golfCourses.map((golfCourse) => (
                    <Marker
                      key={golfCourse.name}
                      position={golfCourse.coordinates}
                      icon={iconPin}
                      onClick={() => {
                        // setSelected(golfCourse)
                      }}
                    />
                  ))
                : null} */}

              {/* {selected ? (
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
              ) : null} */}
            </GoogleMap>
          </Grid>
        </Container>
      </Grid>
    </Fragment>
  )
}
