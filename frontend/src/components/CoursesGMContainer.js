import React, { useState, useRef } from "react"
import useSwr from "swr"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function CoursesMapContainer(props) {
  // The things we need to track in state
  const [mapRef, setMapRef] = useState(null)
  const [selected, setSelected] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [zoom, setZoom] = useState(10)
  // const [map, setMap] = useState(null)

  // const mapRef1 = useRef()
  // setMapRef(mapRef1)
  // console.log("mapRef: " + mapRef)

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  const styles = {
    displayMap: {
      position: "absolute",
      height: "86vh", // 100vh
      width: "98%",
      margin: "20px",
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

    // Fit map bounds to contain all markers
    fitBounds(map)
  }

  const onUnloadHandler = () => {
    setMapRef(null)
  }

  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = (map) => {
    const tempBounds = new window.google.maps.LatLngBounds()
    markers.map((marker) => {
      tempBounds.extend(marker.coordinates)
      return marker.name
    })
    console.log(tempBounds)

    setBounds(tempBounds)
    map.fitBounds(tempBounds)
  }

  const renderMap = () => {
    return (
      <div>
        <GoogleMap
          mapContainerStyle={styles.displayMap}
          defaultZoom={14}
          defaultCenter={props.center}
          options={options}
          onLoad={onLoadHandler}
          onUnmount={onUnloadHandler}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom)
            setBounds([
              bounds.nw.lng,
              bounds.se.lat,
              bounds.se.lng,
              bounds.nw.lat,
            ])
          }}
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
                  <Typography component="p">{selected.description}</Typography>
                </CardContent>
              </Card>
            </InfoWindow>
          ) : null}
        </GoogleMap>
      </div>
    )
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
