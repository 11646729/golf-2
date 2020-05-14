import React, { Component } from "react"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"

const style = {
  map: {
    width: "100%",
    height: "100%",
  },
  containerStyle: {
    // position: "relative",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
}

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
  }
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    })

  onInfoWindowClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    }
  }

  render() {
    var points = [
      { lat: 42.02, lng: -77.01 },
      { lat: 42.03, lng: -77.02 },
      { lat: 41.03, lng: -77.04 },
      { lat: 42.05, lng: -77.02 },
    ]
    var bounds = new this.props.google.maps.LatLngBounds()
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i])
    }
    return (
      <Map
        // containerStyle={containerStyle}
        google={this.props.google}
        initialCenter={{
          lat: 42.39,
          lng: -72.52,
        }}
        style={style.map}
        zoom={14}
        // bounds={bounds}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow
          onClose={this.onInfoWindowClose}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            {/* <h1>{this.state.selectedPlace.name}</h1> */}
            <h1>Here I am</h1>
          </div>
        </InfoWindow>
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY,
})(MapContainer)
