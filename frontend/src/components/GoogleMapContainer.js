// This component is based on the Scotch.io article Build a React & Google Maps App
// https://github.com/RayNjeri/GoogleMaps-React/blob/master/googlemap-react/src/App.js
// But it has been modified

import React, { Component } from "react"
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core"
import { GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react"

import CurrentLocation from "./GoogleMap"

const styles = {
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
}

export class GoogleMapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    image: "static/images/Bosphorus.jpg",
    photoTitle: "Istanbul Bridge Photo",
    title: "Istanbul",
    description:
      "Istanbul is a major city in Turkey that straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects cultural influences of the many empires that once ruled here.",
  }

  // const [data, setData] = useState([])

  displayMarkers() {
    return (
      <Marker
        onClick={this.onMarkerClick}
        position={{
          lat: process.env.REACT_APP_BELFAST_PORT_LATITUDE,
          lng: process.env.REACT_APP_BELFAST_PORT_LONGITUDE,
        }}
      />
    )
  }

  displayInfoWindows() {
    return (
      <InfoWindow
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}
      >
        <Card>
          <CardMedia
            style={styles.media}
            image={this.state.image}
            title={this.state.photoTitle}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.state.title}
            </Typography>
            <Typography component="p">{this.state.description}</Typography>
          </CardContent>
        </Card>
      </InfoWindow>
    )
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    })

  onClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    }
  }

  render() {
    return (
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        {this.displayMarkers()}
        {this.displayInfoWindows()}
      </CurrentLocation>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY,
})(GoogleMapContainer)
