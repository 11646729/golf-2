import React, { useState } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

const GoogleMapContainer = () => {
  // const [myMap, setMyMap] = useState(null)
  const [defaultCenter, setCenter] = useState({
    lat: 54.665577,
    lng: -5.766897,
  })
  const [id, setId] = useState(0)
  // const [markers, setMarkers] = useState([])
  // const [drawMarker, setDrawMarker] = useState(false)

  const mapStyles = {
    position: "absolute",
    height: "100vh", // 100vh
    width: "95%",
    margin: "20px",
  }

  const locations = [
    {
      type: "Feature",
      name: "The Royal Belfast Golf Club",
      phoneNumber: "028 9042 8165",
      location: {
        type: "Point",
        coordinates: { lat: 54.661631, lng: -5.783817 },
      },
    },
    {
      type: "Feature",
      name: "The Royal County Down Golf Club",
      phoneNumber: "028 4372 3314",
      location: {
        type: "Point",
        coordinates: { lat: 54.21792, lng: -5.883267 },
      },
    },
  ]
  // {
  //   name: "Location 5",
  //   location: {
  //     lat: 41.4055,
  //     lng: 2.1915
  //   },

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  const options = {
    mapTypeId: "hybrid",
    // mapTypeId: google.maps.MapTypeId.SATELLITE,
    zoomControlOptions: {
      // position: google.maps.ControlPosition.RIGHT_CENTER, // ,
      // ...otherOptions
    },
  }

  // add marker to Map
  // const addMarker = (coords) => {
  //   setId((id) => id + 1)
  //   setMarkers((markers) => markers.concat([{ coords, id }]))
  // }

  const renderMap = () => (
    <div>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
        options={options}
        // onLoad={(map) => setMyMap(map)}
        // onClick={(e) => (drawMarker ? addMarker(e.latLng.toJSON()) : null)}
      >
        {locations.map((item) => {
          return <Marker key={item.name} position={item.location.coordinates} />
        })}
        {/* {markers
          ? markers.map((marker) => {
              return (
                <Marker
                  key={marker.id}
                  draggable={drawMarker}
                  position={marker.coords}
                  onDragEnd={(e) => (marker.coords = e.latLng.toJSON())}
                />
              )
            })
          : null} */}
      </GoogleMap>
      {/* <button
        type="button"
        style={{ backgroundColor: drawMarker ? "green" : null }}
        onClick={() => {
          setDrawMarker(() => !drawMarker)
        }}
      >
        ADD & DRAG
      </button>
      <button type="button" onClick={() => setMarkers([])}>
        CLEAR MAP
      </button> */}
    </div>
  )

  return isLoaded ? renderMap() : null
}

export default GoogleMapContainer
