import React, { useState, useEffect } from "react"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core"
import fileDatabase from "./testNearbyGolfCourseData2.json"

export default function GoogleMapContainer() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })
  const [markers, setMarkers] = useState("")
  const [selected, setSelected] = useState(null)

  // Listen for data and update the state
  useEffect(() => {
    setMarkers((markers) => [...markers, fileDatabase])
  }, [])

  if (loadError) return "Error loading Map"
  if (!isLoaded) return "Loading Map..."

  const styles = {
    map: {
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

  // const database = {
  //   databaseVersion: 1,
  //   type: "FeatureCollection",
  //   crsName: "WGS84",
  //   crsUrn: "urn:ogc:def:crs:OGC:1.3:CRS84",
  //   _id: "5ec2b04c8d40ab1400d1a012",
  //   courses: [
  //     {
  //       type: "Feature",
  //       _id: "5ec2b04c8d40ab1400d19fb9",
  //       name: "Ardglass Golf Club",
  //       phoneNumber: "028 44 841 219",
  //       coordinates: {
  //         _id: "5ec2b04c8d40ab1400d19fb8",
  //         lat: 54.258716,
  //         lng: -5.604549,
  //       },

  const renderMap = () => {
    return (
      <div>
        <GoogleMap
          mapContainerStyle={styles.map}
          zoom={14}
          center={defaultCenter}
          options={options}
        >
          {markers[0].map((marker) => (
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
        </GoogleMap>
      </div>
    )
  }

  return isLoaded ? renderMap() : null
}
