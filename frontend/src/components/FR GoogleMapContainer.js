import React, { Component } from "react"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core"

const styles = {
  map: {
    width: "100%",
    height: "100%",
  },
  containerStyle: {
    // position: "relative",
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9,
    marginTop: "30",
  },
  // mapConfig: {
  //   width: "100%",
  //   height: "100%",
  //   centerAroundCurrentLocation: false,
  //   visible: true,
  //   fullscreenControl: false,

  //   mapTypeId: "hybrid",
  //   zoomControl: true,
  //   panControl: false,
  //   mapTypeControl: false,
  //   scaleControl: false,
  //   overviewMapControl: false,
  //   rotateControl: false,
  //   disableDefaultUI: true,
  //   keyboardShortcuts: false,
  //   draggable: false,
  //   disableDoubleClickZoom: true,
  //   zoomControlOptions: {
  //     style: google.maps.ZoomControlStyle.SMALL,
  //     position: google.maps.ControlPosition.RIGHT_TOP,
  //   },
  //   scrollwheel: false,
  // },
}

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    image: "static/images/Bosphorus.jpg",
    photoTitle: "Istanbul Bridge Photo",
    title: "Istanbul",
    description:
      "Istanbul is a major city in Turkey that straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects cultural influences of the many empires that once ruled here.",
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    })

  onInfoWindowClose = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      })
    }
  }

  render() {
    var points = [
      { lat: 42.02, lng: -77.01 },
      { lat: 42.03, lng: -77.02 },
      { lat: 41.03, lng: -77.04 },
      { lat: 42.05, lng: -77.02 },
    ]
    var bounds = new this.props.google.maps.LatLngBounds()
    for (var i = 0; i < points.length; i++) {
      bounds.extend(points[i])
    }
    return (
      <Map
        // containerStyle={containerStyle}
        google={this.props.google}
        initialCenter={{
          lat: 42.39,
          lng: -72.52,
        }}
        style={styles.map}
        zoom={14}
        // mapTypeId={"hybrid"}
        streetViewControl={false}
        // bounds={bounds}
      >
        <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow
          onClose={this.onInfoWindowClose}
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
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
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY,
})(MapContainer)
