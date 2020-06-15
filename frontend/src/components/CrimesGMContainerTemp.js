import React, { useState, Fragment } from "react"
import useSwr from "swr"
import {
  useLoadScript,
  GoogleMap,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core"
import "../App.css"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function CrimesMapContainer(props) {
  // The things we need to track in state
  const [mapRef, setMapRef] = useState(null)
  const [selectedPlace, setSelectedPlace] = useState(null)
  const [markerMap, setMarkerMap] = useState({})
  const [center, setCenter] = useState({ lat: 54.665577, lng: -5.766897 })
  const [zoom, setZoom] = useState(5)
  // const [clickedLatLng, setClickedLatLng] = useState(null)
  const [infoOpen, setInfoOpen] = useState(false)

  // Load the Google maps scripts
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  // The places I want to create markers for.
  // This could be a data-driven prop.
  // const points = [
  //   { id: "place1", pos: { lat: 39.09366509575983, lng: -94.58751660204751 } },
  //   { id: "place2", pos: { lat: 39.10894664788252, lng: -94.57926449532226 } },
  //   { id: "place3", pos: { lat: 39.07602397235644, lng: -94.5184089401211 } },
  // ]

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
  // if (points.length === 7) {
  //   console.log(points[0].properties.crimeId)
  //   console.log(points[0].geometry.coordinates)
  // }

  // Iterate myPlaces to size, center, and zoom map to contain all markers
  const fitBounds = (map) => {
    const bounds = new window.google.maps.LatLngBounds()
    // points.map((place) => {
    //   bounds.extend(place.pos)
    //   return place.id
    // })
    points.map((point) => {
      bounds.extend(point.geometry.coordinates)
      return point.properties.crimeId
    })
    map.fitBounds(bounds)
  }

  const loadHandler = (map) => {
    // Store a reference to the google map instance in state
    setMapRef(map)

    // Fit map bounds to contain all markers
    fitBounds(map)
  }

  // We have to create a mapping of our places to actual Marker objects
  const markerLoadHandler = (marker, place) => {
    return setMarkerMap((prevState) => {
      return { ...prevState, [place.id]: marker }
    })
  }

  const markerClickHandler = (event, place) => {
    // Remember which place was clicked
    setSelectedPlace(place)

    // Required so clicking a 2nd marker works as expected
    if (infoOpen) {
      setInfoOpen(false)
    }

    setInfoOpen(true)

    // If you want to zoom in a little on marker click
    if (zoom < 13) {
      setZoom(13)
    }

    // if you want to center the selected Marker
    setCenter(place.pos)
  }

  function handleCenterChanged() {
    setCenter(mapRef.getCenter().toJSON())
  }

  const styles = {
    displayMap: {
      position: "absolute",
      height: "86vh", // 100vh
      width: "98%",
      margin: "20px",
    },
  }

  const renderMap = () => {
    return (
      <Fragment>
        <GoogleMap
          // Do stuff on map initial load
          onLoad={loadHandler}
          // Save the current center position in state
          onCenterChanged={handleCenterChanged}
          // Save the user's map click position
          // onClick={(e) => setClickedLatLng(e.latLng.toJSON())}
          center={props.center}
          zoom={10}
          mapContainerStyle={styles.displayMap}
        >
          {points.map((point) => (
            <Marker
              // key={point.id}
              // position={point.pos}
              key={point.properties.crimeId}
              position={point.geometry.coordinates}
              onLoad={(marker) => markerLoadHandler(marker, point)}
              onClick={(event) => markerClickHandler(event, point)}
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

          {infoOpen && selectedPlace && (
            <InfoWindow
              anchor={markerMap[selectedPlace.id]}
              onCloseClick={() => setInfoOpen(false)}
            >
              <Card>
                <CardMedia
                  style={styles.media}
                  // image={selected.photoUrl}
                  title={selectedPlace.id}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {selectedPlace.id}
                  </Typography>
                  <Typography component="p">{selectedPlace.id}</Typography>
                </CardContent>
              </Card>
              {/* <div>
                <h3>{selectedPlace.id}</h3>
                <div>This is your info window content</div>
              </div> */}
            </InfoWindow>
          )}
        </GoogleMap>
        {/* Our center position always in state */}
        {/* <h3>
          Center {center.lat}, {center.lng}
        </h3> */}
        {/* Position of the user's map click */}
        {/* {clickedLatLng && (
          <h3>
            You clicked: {clickedLatLng.lat}, {clickedLatLng.lng}
          </h3>
        )} */}
        {/* Position of the user's map click */}
        {/* {selectedPlace && <h3>Selected Marker: {selectedPlace.id}</h3>} */}
      </Fragment>
    )
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
