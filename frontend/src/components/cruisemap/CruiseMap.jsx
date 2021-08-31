import React from "react"
import { GoogleMap, LoadScript } from "@react-google-maps/api"
import "./cruisemap.css"

const containerStyle = {
  width: "100%",
  height: "400px",
}

const center = {
  lat: parseFloat(process.env.REACT_APP_BELFAST_PORT_LATITUDE),
  lng: parseFloat(process.env.REACT_APP_BELFAST_PORT_LONGITUDE),
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
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={{
            // mapTypeId: "hybrid",
            disableDefaultUI: true,
            zoomControl: true,
          }}
          // onLoad={onLoad}
          // onUnmount={onUnmount}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  )
}

export default React.memo(CruiseMap)
