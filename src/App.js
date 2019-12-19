import React, { Component } from "react"
import { Map, GoogleApiWrapper } from "google-maps-react"
import { google_maps_api } from "./google_maps"

const mapStyles = {
  width: "100%",
  height: "100%"
}

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        initialCenter={{
          lat: 54.626792,
          lng: -5.884438
        }}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: google_maps_api()
})(MapContainer)
