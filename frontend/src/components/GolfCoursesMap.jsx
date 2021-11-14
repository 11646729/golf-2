import React, { useState, useCallback, memo } from "react"
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
  Button,
  Link,
  CardActions,
} from "@material-ui/core"
import styled from "styled-components"

import Title from "./Title"
// import LoadingTitle from "../LoadingTitle"

const GolfCoursesMapContainer = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px;
  padding-top: 30px;
`

const GolfCoursesMap = (props) => {
  const [map, setMap] = useState(null)
  const [selected, setSelected] = useState(null)

  const mapZoom = parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM)

  const mapCenter = {
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  }

  const mapContainerStyle = {
    height: "450px",
    width: "94%",
    border: "1px solid #ccc",
    marginLeft: 20,
    marginRight: 10,
    marginBottom: 20,
  }

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  // Store a reference to the google map instance in state
  const onLoadHandler = useCallback(function callback(map) {
    setMap(map)
  }, [])

  // Clear the reference to the google map instance
  const onUnmountHandler = useCallback(function callback() {
    setMap(null)
  }, [])

  // Now compute bounds of map to display
  if (map && props.golfCoursesData != null) {
    const bounds = new window.google.maps.LatLngBounds()
    props.golfCoursesData.map((golfcourse) => {
      const myLatLng = new window.google.maps.LatLng({
        lat: golfcourse.courselat,
        lng: golfcourse.courselng,
      })
      bounds.extend(myLatLng)
      return bounds
    })
    map.fitBounds(bounds)
  }

  const iconPin = {
    path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
    fillColor: "#78a32e",
    fillOpacity: 0.7,
    scale: 0.03, // to reduce the size of icons
    strokeColor: "#2f4024",
    strokeWeight: 1,
  }

  return isLoaded ? (
    <GolfCoursesMapContainer>
      <Title>{props.golfCoursesMapTitle}</Title>
      {/* {props.loadingError ? (
          <LoadingTitle>Error Loading...</LoadingTitle>
        ) : null} */}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
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
          ? props.golfCoursesData.map((golfcourse) => (
              <Marker
                key={golfcourse.name}
                position={{
                  lat: golfcourse.courselat,
                  lng: golfcourse.courselng,
                }}
                icon={iconPin}
                onClick={() => {
                  setSelected(golfcourse)
                }}
              />
            ))
          : null}

        {selected ? (
          <InfoWindow
            position={{
              lat: selected.courselat,
              lng: selected.courselng,
            }}
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
                image={selected.photourl}
                title={selected.phototitle}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {selected.name}
                </Typography>
                <Typography component="p">{selected.description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  component={Link}
                  // to="/golfcoursespage"
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </GolfCoursesMapContainer>
  ) : null
}

export default memo(GolfCoursesMap)
