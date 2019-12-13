// import React, { Component } from "react"
// //import logo from "./logo.svg"
// import MapContainer from "./containers/MapContainer"

// // CSS
// import "./App.css"
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
// import "antd/dist/antd.css"

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           {/* <img src={logo} className="App-logo" alt="logo" /> */}
//         </header>
//         <div className="container h-100">
//           <MapContainer />
//         </div>
//       </div>
//     )
//   }
// }

// export default App

import React, { Component } from "react"
import { Map, GoogleApiWrapper } from "google-maps-react"

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
          lat: -1.2884,
          lng: 36.8233
        }}
      />
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDGo8SPcAF8hOBnNhqR1398qUYQrtkgIHQ"
})(MapContainer)
