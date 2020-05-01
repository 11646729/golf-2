// This component is based on the Scotch.io article Build a React & Google Maps App
// https://github.com/RayNjeri/GoogleMaps-React/blob/master/googlemap-react/src/Map.js
// But it has been modified

import React from "react"
import ReactDOM from "react-dom"

const mapStyles = {
  map: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
}

export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props)

    const { lat, lng } = this.props.initialCenter
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    }
  }

  componentDidMount() {
    // if (this.props.centerAroundCurrentLocation) {
    //   if (navigator && navigator.geolocation) {
    //     navigator.geolocation.getCurrentPosition((pos) => {
    //       const coords = pos.coords
    this.setState({
      currentLocation: {
        // lat: coords.latitude,
        // lng: coords.longitude,
        lat: process.env.REACT_APP_HOME_LATITUDE,
        lng: process.env.REACT_APP_HOME_LONGITUDE,
      },
    })
    //     })
    //   }
    // }
    this.loadMap()
  }

  componentDidUpdate(prevProps, prevState) {
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
      const maps = google.maps

      const mapRef = this.refs.map

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef)

      let { zoom, mapTypeId } = this.props
      const { lat, lng } = this.state.currentLocation
      const center = new maps.LatLng(lat, lng)
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
          mapTypeId: mapTypeId,
          streetViewControl: false,
        }
      )

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig)
    }
  }

  recenterMap() {
    const map = this.map
    // const current = this.state.currentLocation

    const google = this.props.google
    const maps = google.maps

    if (map) {
      let center = new maps.LatLng(
        process.env.REACT_APP_BELFAST_PORT_LATITUDE,
        process.env.REACT_APP_BELFAST_PORT_LONGITUDE
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

CurrentLocation.defaultProps = {
  zoom: 14,
  initialCenter: {
    lat: process.env.REACT_APP_HOME_LATITUDE,
    lng: process.env.REACT_APP_HOME_LONGITUDE,
  },
  centerAroundCurrentLocation: false,
  visible: true,
  mapTypeId: "hybrid",
}
