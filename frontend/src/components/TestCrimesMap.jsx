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
import useSupercluster from "use-supercluster"
import styled from "styled-components"

import Title from "./Title"

const NearbyCrimesMapContainer = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px;
  padding-top: 30px;
`

const NearbyCrimesMap = (props) => {
  const { crimesData, nearbyCrimesMapTitle } = props

  NearbyCrimesMap.propTypes = {
    crimesData: PropTypes.array,
    nearbyCrimesMapTitle: PropTypes.string,
  }

  const [map, setMap] = useState(null)
  const [reformattedCrimesData, setReformattedCrimesData] = useState([])
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
  const onLoadHandler = useCallback((Mymap) => {
    setMap(Mymap)
  }, [])

  // Clear the reference to the google map instance
  const onUnmountHandler = useCallback(() => {
    setMap(null)
  }, [])

  // Now reformat relevant crimes data to use with supercluster
  useEffect(() => {
    const changedCrimesData = crimesData.map((crime) => ({
      type: "Feature",
      properties: {
        cluster: false,
        crimeId: crime.id,
        category: crime.category,
        month: crime.month,
      },
      geometry: {
        type: "Point",
        coordinates: [
          parseFloat(crime.location.longitude),
          parseFloat(crime.location.latitude),
        ],
      },
    }))

    // console.log(changedCrimesData)
    setReformattedCrimesData(changedCrimesData)
  }, [crimesData])

  useEffect(() => {
    if (map) {
      if (reformattedCrimesData.length > 0) {
        const mapBounds = new window.google.maps.LatLngBounds()

        reformattedCrimesData.map((crime) => {
          const myLatLng = new window.google.maps.LatLng({
            lat: crime.geometry.coordinates[1],
            lng: crime.geometry.coordinates[0],
          })
          mapBounds.extend(myLatLng)

          return mapBounds
        })

        map.fitBounds(mapBounds)
      }
    }
  }, [map, reformattedCrimesData])

  if (reformattedCrimesData.length > 0) console.log(reformattedCrimesData)

  // Now use supercluster via useSupercluster hook
  // const { clusters, supercluster } = useSupercluster({
  //   points: reformattedCrimesData,
  //   bounds: mapBounds,
  //   zoom: mapZoom,
  //   options: { radius: 75, maxZoom: 20 },
  // })

  const iconPin = {
    path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
    fillColor: "#78a32e",
    fillOpacity: 0.7,
    scale: 0.03, // to reduce the size of icons
    strokeColor: "#2f4024",
    strokeWeight: 1,
  }

  return isLoaded ? (
    <NearbyCrimesMapContainer>
      <Title>{nearbyCrimesMapTitle}</Title>
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
        {reformattedCrimesData
          ? reformattedCrimesData.map((crime) => (
              <Marker
                key={`crime-${crime.properties.crimeId}`}
                position={{
                  lat: crime.geometry.coordinates[1],
                  lng: crime.geometry.coordinates[0],
                }}
                icon={iconPin}
                onClick={() => {
                  setSelected(crime)
                }}
              />
            ))
          : null}

        {selected
          ? console.log(selected)
          : // <InfoWindow
            //   position={{
            //     lat: selected.lat,
            //     lng: selected.lng,
            //   }}
            //   onCloseClick={() => {
            //     setSelected(null)
            //   }}
            // >
            //   <Card>
            //     <CardMedia
            //       style={{
            //         height: 0,
            //         paddingTop: "40%",
            //         marginTop: "30",
            //       }}
            //       image={selected.photourl}
            //       title={selected.phototitle}
            //     />
            //     <CardContent>
            //       <Typography gutterBottom variant="h5" component="h2">
            //         {selected.name}
            //       </Typography>
            //       <Typography component="p">{selected.description}</Typography>
            //     </CardContent>
            //     <CardActions>
            //       <Button
            //         size="small"
            //         color="primary"
            //         component={Link}
            //         // to="/golfcoursespage"
            //       >
            //         View
            //       </Button>
            //     </CardActions>
            //   </Card>
            // </InfoWindow>
            null}
      </GoogleMap>
    </NearbyCrimesMapContainer>
  ) : null
}

export default memo(NearbyCrimesMap)
