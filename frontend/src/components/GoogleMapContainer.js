// This component is based on the Scotch.io article Build a React & Google Maps App
// https://github.com/RayNjeri/GoogleMaps-React/blob/master/googlemap-react/src/App.js
// But it has been modified

import React, { Component } from "react"
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core"
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react"

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
    locations: [
      {
        latitude: process.env.REACT_APP_BELFAST_PORT_LATITUDE,
        longitude: process.env.REACT_APP_BELFAST_PORT_LONGITUDE,
        image: "static/images/Bosphorus.jpg",
        photoTitle: "Istanbul Bridge Photo",
        title: "Istanbul",
        description:
          "Istanbul is a major city in Turkey that straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects cultural influences of the many empires that once ruled here.",
      },
    ],
  }

  displayMarkers(locations) {
    return locations.map((place, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: place.latitude,
            lng: place.longitude,
          }}
          onClick={this.onMarkerClick}
          name={"current location"}
        />
      )
    })
  }

  displayInfoWindows(locations) {
    return locations.map((place, index) => {
      return (
        <InfoWindow
          key={index}
          id={index}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <Card>
            <CardMedia
              style={styles.media}
              image={place.image}
              title={place.photoTitle}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {place.title}
              </Typography>
              <Typography component="p">{place.description}</Typography>
            </CardContent>
          </Card>
        </InfoWindow>
      )
    })
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
        {this.displayMarkers(this.state.locations)}
        {this.displayInfoWindows(this.state.locations)}
      </CurrentLocation>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY,
})(GoogleMapContainer)
