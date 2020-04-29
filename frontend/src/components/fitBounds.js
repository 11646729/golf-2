// import React from "react"

// import {
//   withGoogleMap,
//   GoogleMap,
//   InfoWindow,
//   Marker,
//   OverlayView,
// } from "react-google-maps"

// import InfoBox from "react-google-maps/lib/addons/InfoBox"
// import map from "lodash/map"

// // Higher-Order Component
// const AllocatedPlacesMap = withGoogleMap((props) => (
//   <GoogleMap
//     center={props.center}
//     defaultZoom={4}
//     options={{ scrollwheel: false, minZoom: 3, maxZoom: 15 }}
//     onCenterChanged={props.onCenterChanged}
//     ref={props.onMapMounted}
//   >
//     {props.markers.map((marker, index) => (
//       <Marker key={index} position={marker.position} />
//     ))}
//   </GoogleMap>
// ))

// class Map extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {}
//   }

//   getCenter = () => {
//     this._bounds = new google.maps.LatLngBounds()
//     this.props.markers.forEach((marker, index) => {
//       const position = new google.maps.LatLng(marker.lat, marker.lng)
//       this._bounds.extend(position)
//     })
//     return this._bounds.getCenter()
//   }

//   componentDidUpdate() {
//     this._map.fitBounds(this._map, this._bounds)
//   }

//   handleMapMounted = (map) => {
//     this._map = map
//   }

//   render() {
//     return (
//       <div className="allocated-places">
//         <AllocatedPlacesMap
//           containerElement={<div style={{ height: `100%` }} />}
//           mapElement={<div style={{ height: `100%` }} />}
//           center={this.getCenter()}
//           markers={props.markers}
//           onMapMounted={this.handleMapMounted}
//         />
//       </div>
//     )
//   }
// }

// export default Map
