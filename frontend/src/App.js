import React, { Component } from "react"
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react"

import CurrentLocation from "./components/Map"
import Weather from "./components/Weather"
import Album from "./components/Album"

export class App extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    return (
      // <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
      //   <Marker onClick={this.onMarkerClick} name={"current location"} />
      //   <InfoWindow
      //     marker={this.state.activeMarker}
      //     visible={this.state.showingInfoWindow}
      //     onClose={this.onClose}
      //   >
      //     <div>
      //       <h4>{this.state.selectedPlace.name}</h4>
      //     </div>
      //   </InfoWindow>
      //   {/* <Weather></Weather> */}
      // </CurrentLocation>
      <Album></Album>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY
})(App)
