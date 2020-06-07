import React, { useState } from "react"
import useSwr from "swr"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function GoogleMapContainer() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })
  // const [markers, setMarkers] = useState([])
  const [selected, setSelected] = useState(null)

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

  const defaultCenter = {
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE), // 54.665577
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE), // -5.766897
  }

  const options = {
    mapTypeId: "hybrid",
    disableDefaultUI: true,
    zoomControl: true,
  }

  const url = "http://localhost:5000/api/golf/nearbyGolfCourses"
  const { data, error } = useSwr(url, { fetcher })
  const markers = data && !error ? data : []

  if (error) return "Error loading Map"
  if (!data) return "Loading Map..."

  const renderMap = () => {
    return (
      <div>
        <GoogleMap
          mapContainerStyle={styles.displayMap}
          zoom={14}
          center={defaultCenter}
          options={options}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.name}
              position={marker.coordinates}
              onClick={() => {
                setSelected(marker)
              }}
            />
          ))}
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
        </GoogleMap>{" "}
      </div>
    )
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
