// This component is based on the Scotch.io article Build a React & Google Maps App
// https://github.com/RayNjeri/GoogleMaps-React/blob/master/googlemap-react/src/Map.js
// But it has been modified

import React from "react"
import ReactDOM from "react-dom"
import socketIOClient from "socket.io-client"

const mapStyles = {
  map: {
    position: "absolute",
    width: "100%",
    height: "90%",
  },
}

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentLocation: {
        lat: process.env.REACT_APP_HOME_LATITUDE,
        lng: process.env.REACT_APP_HOME_LONGITUDE,
      },
      // nearbyGolfCourseData: "",
    }
  }

  componentDidMount() {
    this.setState({
      currentLocation: {
        lat: this.state.currentLocation.lat,
        lng: this.state.currentLocation.lng,
      },
    })
    this.loadMap()
  }

  componentDidUpdate(prevProps, prevState) {
    //Very simply connect to the socket
    // const socket = socketIOClient(process.env.REACT_APP_SOCKET_ENDPOINT)

    //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
    // socket.on("NearbyGolfCourseData", (data) =>
    //   this.setState({ nearbyGolfCourseData: data })
    // )

    // console.log(this.state.nearbyGolfCourseData)

    if (prevProps.google !== this.props.google) {
      this.loadMap()
    }

    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap()
    }
  }

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props
      // const maps = google.maps

      const mapRef = this.refs.map

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef)

      const mapConfig = Object.assign(
        {},
        {
          centerAroundCurrentLocation: false,
          visible: true,
          fullscreenControl: false,

          mapTypeId: "hybrid",
          zoom: 12,
          zoomControl: true,
          zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.RIGHT_TOP,
          },
          panControl: false,
          mapTypeControl: false,
          scaleControl: false,
          overviewMapControl: false,
          rotateControl: false,
          disableDefaultUI: true,
          keyboardShortcuts: false,
          draggable: false,
          disableDoubleClickZoom: true,
          scrollwheel: false,
          streetViewControl: false,
        }
      )

      // maps.Map() is constructor that instantiates the map
      this.map = new google.maps.Map(node, mapConfig)
    }
  }

  recenterMap() {
    const map = this.map

    const google = this.props.google
    //    const maps = google.maps

    if (map) {
      let center = new google.maps.LatLng(
        this.state.currentLocation.lat,
        this.state.currentLocation.lng
      )

      map.panTo(center)
    }
  }

  renderChildren() {
    const { children } = this.props

    if (!children) return

    return React.Children.map(children, (c) => {
      if (!c) return
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation,
      })
    })
  }

  render() {
    const style = Object.assign({}, mapStyles.map)
    return (
      <div>
        <div style={style} ref="map">
          Loading map...
        </div>
        {this.renderChildren()}
      </div>
    )
  }
}

export default CurrentLocation
