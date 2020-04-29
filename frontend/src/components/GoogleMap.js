// This component is based on the Scotch.io article Build a React & Google Maps App
// https://github.com/RayNjeri/GoogleMaps-React/blob/master/googlemap-react/src/App.js
// But it has been modified

import React, { Component } from "react"
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core"
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react"

const styles = {
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
}

export class GoogleMap extends Component {
  state = {
    showingInfoWindow: false, //Hides or the shows the infoWindow
    activeMarker: {}, //Shows the active marker upon click
    selectedPlace: {}, //Shows the infoWindow to the selected place upon a marker
    locations: [
      {
        // latitude: 41.0444,
        // longitude: 29.035356,
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

  render() {
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={styles}
        initialCenter={{
          lat: process.env.REACT_APP_BELFAST_PORT_LATITUDE,
          lng: process.env.REACT_APP_BELFAST_PORT_LONGITUDE,
        }}
      >
        {this.displayMarkers(this.state.locations)}
        {this.displayInfoWindows(this.state.locations)}
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY,
})(GoogleMap)
