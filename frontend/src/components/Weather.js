import React, { Component } from "react"
import socketIOClient from "socket.io-client"

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      darkSkiesdata: false
    }
  }

  componentDidMount() {
    const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)

    socket.on("DataFromDarkSkiesAPI", data =>
      this.setState({ darkSkiesdata: data })
    )

    // const positionOptions = {
    //   enableHighAccuracy: true,
    //   maximumAge: 0
    // }

    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     position => {
    //       const { latitude: lat, longitude: lng } = position.coords
    //       socket.emit("fetchLocation", { lat, lng })
    //     },
    //     err => {
    //       console.error("Navigator error")
    //     },
    //     positionOptions
    //   )
    // }
  }

  render() {
    // if (this.state.darkSkiesdata) {
    //   console.log(this.state.darkSkiesdata.value)
    // }

    return (
      <div style={{ textAlign: "center" }}>
        {this.state.darkSkiesdata ? (
          <p>
            The temperature in Seahill is: {this.state.darkSkiesdata.value} °F
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}

export default Weather
