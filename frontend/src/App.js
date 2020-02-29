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

// import React, { Component } from "react"
// import socketIOClient from "socket.io-client"

// class App extends Component {
//   constructor() {
//     super()
//     this.state = {
//       response: false,
//       endpoint: "http://127.0.0.1:5000"
//     }
//   }

//   componentDidMount() {
//     const { endpoint } = this.state
//     const socket = socketIOClient(endpoint)

//     socket.on("transmitCount", data => this.setState({ response: data }))
//   }

//   //    socket.on("transmitPosition", data => this.setState({ position: data }))

//   render() {
//     return (
//       <div style={{ textAlign: "center" }}>
//         {this.state.response ? (
//           <p>The temperature in Seahill is: {this.state.response} °F</p>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     )
//   }
// }

import React, { Component } from "react"

let api = "https://fcc-weather-api.glitch.me/api/current?"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      items: {}
    }

    this.fetchWeather = this.fetchWeather.bind(this)
  }

  fetchWeather(apiStr) {
    fetch(apiStr)
      .then(res => res.json())
      .then(
        result => {
          console.log(result)
          this.setState({
            isLoaded: true,
            items: result.main
          })
          console.log(this.state)
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        error => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        api += `lat=${position.coords.latitude}&lon=${position.coords.longitude}`
        console.log(api)

        this.fetchWeather(api)
      })
    }
  }

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        {this.state.items ? (
          <p>The temperature in Seahill is: {this.state.items.main} °F</p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}

export default App
