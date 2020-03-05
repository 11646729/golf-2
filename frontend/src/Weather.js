import React, { Component } from "react"
import socketIOClient from "socket.io-client"

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoaded: false,
      //      items: {},
      darkSkiesdata: false,
      endpoint: "http://127.0.0.1:5000"
    }
  }

  componentDidMount() {
    const { endpoint } = this.state
    const socket = socketIOClient(endpoint)

    socket.on("DataFromDarkSkiesAPI", data =>
      this.setState({ darkSkiesdata: data })
    )

    const positionOptions = {
      enableHighAccuracy: true,
      maximumAge: 0
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude: lat, longitude: lng } = position.coords
          socket.emit("fetchLocation", { lat, lng })
        },
        err => {
          console.error("Navigator error")
        },
        positionOptions
      )
    }
  }

  render() {
    // if (this.state.darkSkiesdata) {
    //   console.log(this.state.darkSkiesdata)
    // }

    return (
      <div style={{ textAlign: "center" }}>
        {this.state.darkSkiesdata ? (
          <p>
            The temperature in Seahill is:{" "}
            {this.state.darkSkiesdata.temperature} °F
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    )
  }
}

export default Weather
