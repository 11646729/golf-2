// This component is based on the Scotch.io article Build a React & Google Maps App
// https://github.com/RayNjeri/GoogleMaps-React/blob/master/googlemap-react/src/Map.js
// But it has been modified

import React from "react"
import ReactDOM from "react-dom"

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

    const { lat, lng } = this.props.initialCenter
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng,
      },
    }
  }

  componentDidMount() {
    this.setState({
      currentLocation: {
        lat: process.env.REACT_APP_BELFAST_PORT_LATITUDE,
        lng: process.env.REACT_APP_BELFAST_PORT_LONGITUDE,
      },
    })
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

      // const { lat, lng } = this.state.currentLocation
      // const center = new maps.LatLng(lat, lng)
      const mapConfig = Object.assign(
        {},
        {
          centerAroundCurrentLocation: false,
          visible: true,
          fullscreenControl: false,

          mapTypeId: "hybrid",
          center: {
            lat: process.env.REACT_APP_HOME_LATITUDE,
            lng: process.env.REACT_APP_HOME_LONGITUDE,
          },
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
  initialCenter: {
    lat: process.env.REACT_APP_HOME_LATITUDE,
    lng: process.env.REACT_APP_HOME_LONGITUDE,
  },
}
