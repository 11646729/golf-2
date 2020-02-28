// import React, { Component } from "react"
// import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react"

// import CurrentLocation from "./Map"

// export class MapContainer extends Component {
//   state = {
//     showingInfoWindow: false,
//     activeMarker: {},
//     selectedPlace: {}
//   }

//   onMarkerClick = (props, marker, e) =>
//     this.setState({
//       selectedPlace: props,
//       activeMarker: marker,
//       showingInfoWindow: true
//     })

//   onClose = props => {
//     if (this.state.showingInfoWindow) {
//       this.setState({
//         showingInfoWindow: false,
//         activeMarker: null
//       })
//     }
//   }

//   render() {
//     return (
//       <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
//         <Marker onClick={this.onMarkerClick} name={"current location"} />
//         <InfoWindow
//           marker={this.state.activeMarker}
//           visible={this.state.showingInfoWindow}
//           onClose={this.onClose}
//         >
//           <div>
//             <h4>{this.state.selectedPlace.name}</h4>
//           </div>
//         </InfoWindow>
//       </CurrentLocation>
//     )
//   }
// }

// export default GoogleApiWrapper({
//   apiKey: process.env.REACT_APP_GOOGLE_KEY
// })(MapContainer)

import React, { Component } from "react"
import socketIOClient from "socket.io-client"

class App extends Component {
  constructor() {
    super()
    this.state = {
      response: false,
      endpoint: "http://127.0.0.1:5000"
    }
  }

  componentDidMount() {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)

    const positionOptions = {
      enableHighAccuracy: true,
      maximumAge: 0
    }

    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        socket.emit("updateLocation", { lat, lng })
        console.log({ lat, lng })
      },
      error => {
        console.error("Error")
      },
      positionOptions
    )

    socket.on("transmitCount", data => this.setState({ response: data }))
  }

  render() {
    const { response } = this.state
    return (
      <div style={{ textAlign: "center" }}>
        {response ? (
          <p>The temperature in Seahill is: {response} °F</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}

export default App
