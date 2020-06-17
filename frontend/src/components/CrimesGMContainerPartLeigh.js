import React, { useState, Fragment } from "react"
import useSwr from "swr"
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import useSupercluster from "use-supercluster"
import "../App.css"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

const styles = {
  displayMap: {
    position: "absolute",
    height: "86vh", // 100vh
    width: "98%",
    margin: "20px",
  },
}

export default function CrimesMapContainer(props) {
  // Setup map
  // Load the Google maps scripts
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  // The things we need to track in state
  const [mapRef, setMapRef] = useState(null)
  const [bounds, setBounds] = useState(null)
  const [zoom, setZoom] = useState(null)

  // Store a reference to the google map instance in state
  const loadHandler = (map) => {
    setMapRef(map)
  }

  const onUnmountHandler = () => {
    setMapRef(null)
  }

  // Load and prepare data
  // Build Crimes Url
  let crimesUrl =
    process.env.REACT_APP_CRIMES_ENDPOINT +
    "?lat=" +
    process.env.REACT_APP_HOME_LATITUDE +
    "&lng=" +
    process.env.REACT_APP_HOME_LONGITUDE +
    "&date=2020-04"

  // Fetch data
  const { data, error } = useSwr(crimesUrl, { fetcher })
  const crimes = data && !error ? data : []

  // Reformat data for plotting
  const markers = crimes.map((crime) => ({
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

  // get map bounds
  if (mapRef) {
    const bounds = new window.google.maps.LatLngBounds()
    markers.map((marker) => {
      bounds.extend(marker.geometry.coordinates)
      return bounds
    })
    mapRef.fitBounds(bounds)
  }

  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds()
    markers.map((point) => {
      bounds.extend(point.geometry.coordinates)
      return point.properties.crimeId
    })
    map.fitBounds(bounds)
  }

  // get clusters

  // return map
  const renderMap = () => {
    return (
      <Fragment>
        <GoogleMap
          mapContainerStyle={styles.displayMap}
          center={props.center}
          zoom={props.zoom}
          onLoad={loadHandler}
          onUnmount={onUnmountHandler}
          onChange={({ zoom, bounds }) => {
            setZoom(zoom)
            // fitBounds(bounds)
            // setBounds([
            //   bounds.nw.lng,
            //   bounds.se.lat,
            //   bounds.se.lng,
            //   bounds.nw.lat,
            // ])
          }}
          // yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map }) => {
          //   mapRef.current = map
          // }}
        >
          {markers.map((marker) => (
            <Marker
              key={marker.properties.crimeId}
              position={marker.geometry.coordinates}
              // onLoad={(marker) => markerLoadHandler(marker, point)}
              // onClick={(event) => markerClickHandler(event, point)}
              // Not required, but if you want a custom icon:
              // icon={{
              //   path:
              //     "M12.75 0l-2.25 2.25 2.25 2.25-5.25 6h-5.25l4.125 4.125-6.375 8.452v0.923h0.923l8.452-6.375 4.125 4.125v-5.25l6-5.25 2.25 2.25 2.25-2.25-11.25-11.25zM10.5 12.75l-1.5-1.5 5.25-5.25 1.5 1.5-5.25 5.25z",
              //   fillColor: "#0000ff",
              //   fillOpacity: 1.0,
              //   strokeWeight: 0,
              //   scale: 1.25,
              // }}
            />
          ))}
        </GoogleMap>
      </Fragment>
    )
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
