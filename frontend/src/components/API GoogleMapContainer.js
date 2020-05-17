import React, { useState } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

const Map = () => {
  const [myMap, setMyMap] = useState(null)
  const [center, setCenter] = useState({ lat: 54.665577, lng: -5.766897 })
  const [id, setId] = useState(0)
  const [markers, setMarkers] = useState([])
  const [drawMarker, setDrawMarker] = useState(false)

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
  const addMarker = (coords) => {
    setId((id) => id + 1)
    setMarkers((markers) => markers.concat([{ coords, id }]))
  }

  const renderMap = () => (
    <div>
      <GoogleMap
        mapContainerStyle={{
          position: "absolute",
          height: "100%",
          width: "90%",
          margin: "20px",
        }}
        zoom={10}
        center={center}
        options={options}
        onLoad={(map) => setMyMap(map)}
        onClick={(e) => (drawMarker ? addMarker(e.latLng.toJSON()) : null)}
      >
        {markers
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
          : null}
      </GoogleMap>
      <button
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
      </button>
    </div>
  )

  return isLoaded ? renderMap() : null
}

export default Map
