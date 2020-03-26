import React, { Component } from "react"
import { render } from "react-dom"
import Map from "./Map"
import InfoWindow from "./InfoWindow"

class CardMap extends Component {
  constructor() {
    super()
    this.createInfoWindow = this.createInfoWindow.bind(this)

    this.state = {
      initialCenter: {
        lat: 54.626792,
        lng: -5.884438
      },
      zoom: 12
    }
  }

  createInfoWindow(e, map) {
    const infoWindow = new window.google.maps.InfoWindow({
      content: '<div id="infoWindow" />',
      position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
    })
    infoWindow.addListener("domready", e => {
      render(<InfoWindow />, document.getElementById("infoWindow"))
    })
    infoWindow.open(map)
  }

  render() {
    return (
      <div>
        <Map
          id="myMap"
          options={{
            center: {
              lat: this.state.initialCenter.lat,
              lng: this.state.initialCenter.lng
            },
            zoom: this.state.zoom
          }}
          onMapLoad={map => {
            var marker = new window.google.maps.Marker({
              position: {
                lat: this.state.initialCenter.lat,
                lng: this.state.initialCenter.lng
              },
              map: map,
              title: "Hello Cruise Terminal!"
            })
            marker.addListener("click", e => {
              this.createInfoWindow(e, map)
            })
          }}
        />
      </div>
    )
  }
}

export default CardMap

// CardMap.defaultProps = {
//   zoom: 12,
//   initialCenter: {
//     lat: 54.626792,
//     lng: -5.884438
//   }
// }
