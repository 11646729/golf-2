import React from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import "./cruisemap.css"

const containerStyle = {
  width: "100%",
  height: "400px",
}

const center = {
  lat: parseFloat(process.env.REACT_APP_BELFAST_PORT_LATITUDE),
  lng: parseFloat(process.env.REACT_APP_BELFAST_PORT_LONGITUDE),
}

const mapZoom = 4

const HomePosition = {
  lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
  lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
}

const AnthemOfTheSeasPosition = {
  // lat: 49.74872,
  // lng: -5.20943,
  // lat: 53.39031,
  // lng: -5.32638,
  lat: 55.95473,
  lng: -4.758,
}

const iconPin = {
  path: "M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z",
  fillColor: "#6dbef1",
  fillOpacity: 0.7,
  scale: 0.03, // to reduce the size of icons
  strokeColor: "#2f4024",
  strokeWeight: 1,
}

const onLoad = (marker) => {
  console.log("marker: ", marker)
}

function CruiseMap(props) {
  // const [map, setMap] = React.useState(null)

  // const onLoad = React.useCallback(function callback(map) {
  //   const bounds = new window.google.maps.LatLngBounds()
  //   map.fitBounds(bounds)
  //   setMap(map)
  // }, [])

  // const onUnmount = React.useCallback(function callback(map) {
  //   setMap(null)
  // }, [])

  return (
    <div className="widgetCm">
      <h3 className="widgetCmTitle">{""}</h3>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={mapZoom}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
          }}

          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}

          <Marker onLoad={onLoad} position={HomePosition} />
          <Marker
            onLoad={onLoad}
            position={AnthemOfTheSeasPosition}
            icon={iconPin}
          />
          {/* <Marker
                    // key={golfcourse.name}
                    position={{
                      lat: golfcourse.courselat,
                      lng: golfcourse.courselng,
                    }}
                    icon={iconPin}
                    onClick={() => {
                      setSelected(golfcourse)
                    }}
                  /> */}
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default React.memo(CruiseMap)
