import React, { useState, useEffect, useCallback, memo } from "react"
import PropTypes from "prop-types"
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

const CruisesMapContainer = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px;
  padding-top: 30px;
`

const CruisesMap = (props) => {
  const { cruisesMapTitle, cruisesHomePosition, vesselPositions } = props

  CruisesMap.propTypes = {
    cruisesMapTitle: PropTypes.string,
    cruisesHomePosition: PropTypes.object,
    vesselPositions: PropTypes.array,
  }

  // console.log(cruisesHomePosition)

  const [map, setMap] = useState(null)
  const [selected, setSelected] = useState(null)

  const mapZoom = parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM)

  const mapCenter = {
    lat: parseFloat(process.env.REACT_APP_BELFAST_PORT_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_BELFAST_PORT_LONGITUDE),
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
  const onLoadHandler = useCallback((Mymap) => {
    setMap(Mymap)
  }, [])

  // Clear the reference to the google map instance
  const onUnmountHandler = useCallback(() => {
    setMap(null)
  }, [])

  // Now compute bounds of map to display
  useEffect(() => {
    if (map) {
      if (vesselPositions.length > 0) {
        const bounds = new window.google.maps.LatLngBounds()

        vesselPositions.map((vesselPosition) => {
          const myLatLng = new window.google.maps.LatLng({
            lat: vesselPosition.lat,
            lng: vesselPosition.lng,
          })
          bounds.extend(myLatLng)

          return bounds
        })

        map.fitBounds(bounds)
      }
    }
  }, [map, vesselPositions])

  const iconPin = {
    path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
    fillColor: "#6dbef1",
    fillOpacity: 0.7,
    scale: 0.03, // to reduce the size of icons
    strokeColor: "#2f4024",
    strokeWeight: 1,
  }

  return isLoaded ? (
    <CruisesMapContainer>
      <Title>{cruisesMapTitle}</Title>
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
        <Marker position={cruisesHomePosition} />

        {vesselPositions
          ? vesselPositions.map((vesselPosition) => (
              //                console.log(vesselPosition.index),
              //                (
              <Marker
                key={vesselPosition.index}
                position={{
                  lat: vesselPosition.lat,
                  lng: vesselPosition.lng,
                }}
                icon={iconPin}
                onClick={() => {
                  setSelected(vesselPosition)
                }}
              />
              //                )
            ))
          : null}

        {selected ? (
          <InfoWindow
            position={{
              lat: selected.lat,
              lng: selected.lng,
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
                // image={selected.photourl}
                // title={selected.phototitle}
              />
              <CardContent>
                {/* <Typography gutterBottom variant="h5" component="h2"> */}
                <Typography component="p">{selected.vesselName}</Typography>
                <Typography component="p">{selected.timestamp}</Typography>
                <Typography component="p">
                  En Route to {selected.destination}
                </Typography>
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
    </CruisesMapContainer>
  ) : null
}

export default memo(CruisesMap)
