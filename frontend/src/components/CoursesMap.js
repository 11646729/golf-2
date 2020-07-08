import React, { useState, Fragment } from "react"
import useSwr from "swr"
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
} from "@material-ui/core"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function CoursesMapContainer() {
  // State
  const [mapRef, setMapRef] = useState(null)
  const [selected, setSelected] = useState(null)
  // const [bounds, setBounds] = useState(null)
  const [mapZoom, setZoom] = useState(
    parseFloat(process.env.REACT_APP_CRIMES_DEFAULT_ZOOM)
  )
  const [mapCenter, setMapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  const styles = {
    displayMap: {
      height: "670px",
      width: "98%",
      margin: 20,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9,
      marginTop: "30",
    },
  }

  const options = {
    mapTypeId: "hybrid",
    disableDefaultUI: true,
    zoomControl: true,
  }

  const url = "http://localhost:5000/api/golf/nearbyGolfCourses"
  const { data, error } = useSwr(url, { fetcher })
  const markers = data && !error ? data : []

  const onLoadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map)
  }

  const onUnmountHandler = () => {
    setMapRef(null)
  }

  // get map bounds
  if (mapRef) {
    const bounds = new window.google.maps.LatLngBounds()
    markers.map((marker) => {
      bounds.extend(marker.coordinates)
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
              <GoogleMap
                mapContainerStyle={styles.displayMap}
                center={mapCenter}
                zoom={mapZoom}
                options={options}
                onLoad={onLoadHandler}
                onUnmount={onUnmountHandler}
              >
                {markers
                  ? markers.map((marker) => (
                      <Marker
                        key={marker.name}
                        position={marker.coordinates}
                        onClick={() => {
                          setSelected(marker)
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
                        style={styles.media}
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
