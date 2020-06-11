import React, { useState, useCallback } from "react"
import useSwr from "swr"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core"
import useSupercluster from "use-supercluster"
import "../App.css"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function GoogleMapContainer() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  // const mapRef = useRef()

  const [bounds, setBounds] = useState(null)
  const [zoom, setZoom] = useState(10)
  const [selected, setSelected] = useState(null)
  const [map, setMap] = useState(null)

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds()
    console.log(bounds)

    // map.fitBounds(bounds)
    // setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map) {
    setMap(null)
  }, [])

  // build Crimes Url
  let crimesUrl =
    process.env.REACT_APP_CRIMES_ENDPOINT +
    "?lat=" +
    process.env.REACT_APP_HOME_LATITUDE +
    "&lng=" +
    process.env.REACT_APP_HOME_LONGITUDE +
    "&date=2020-04"

  // fetch data
  const { data, error } = useSwr(crimesUrl, { fetcher })
  const crimes = data && !error ? data : []

  // if (error) return "Error loading Map"
  // if (!data) return "Loading Map..."

  const points = crimes.map((crime) => ({
    type: "Feature",
    properties: { cluster: false, crimeId: crime.id, category: crime.category },
    geometry: {
      type: "Point",
      coordinates: {
        lat: parseFloat(crime.location.latitude),
        lng: parseFloat(crime.location.longitude),
      },
    },
  }))

  // const { clusters, supercluster } = useSupercluster({
  //   points,
  //   bounds,
  //   zoom,
  //   options: { radius: 75, maxZoom: 20 },
  // })

  // console.log("Crimes: " + crimes)
  // console.log("Points: " + points)
  // console.log("Bounds: " + bounds)
  // console.log("Zoom: " + zoom)
  // console.log("Clusters: " + clusters)
  // console.log("Supercluster: " + supercluster)

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
    disableDefaultUI: true,
    zoomControl: true,
  }

  const renderMap = () => {
    return (
      <div>
        <GoogleMap
          mapContainerStyle={styles.displayMap}
          zoom={10}
          center={defaultCenter}
          options={options}
          onLoad={onLoad}
          onUnmount={onUnmount}
          yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map }) => {
          //   mapRef.current = map
          // }}
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
          {points.map((crime) => (
            <Marker
              key={crime.properties.crimeId}
              position={crime.geometry.coordinates}
              onClick={() => {
                setSelected(crime)
              }}
            ></Marker>
          ))}
          {selected ? (
            <InfoWindow
              position={selected.geometry.coordinates}
              onCloseClick={() => {
                setSelected(null)
              }}
            >
              <Card>
                {/* <CardMedia
                  style={styles.media}
                  // image={selected.photoUrl}
                  title={selected.properties.category}
                /> */}
                <CardContent>
                  {/* <Typography gutterBottom variant="h5" component="h2">
                    {selected.properties.category}
                  </Typography> */}
                  <Typography component="p">
                    {selected.properties.category}
                  </Typography>
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
