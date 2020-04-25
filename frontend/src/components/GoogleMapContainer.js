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
  }

  displayMarkers() {
    // displayMarkers(stores) {
    // return stores.map((place, index) => {
    return (
      <Marker onClick={this.onMarkerClick} name={"current location"} />
      // <Marker
      //   key={index}
      //   id={index}
      //   position={{
      //     lat: place.latitude,
      //     lng: place.longitude,
      //   }}
      //   onClick={() => console.log("You clicked me!")}
      // />
    )
    // })
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
        {/* <Marker onClick={this.onMarkerClick} name={"current location"} /> */}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <Card>
            <CardMedia
              style={styles.media}
              image="static/images/Bosphorus.jpg"
              title="Istanbul Bridge Photo"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Istanbul
              </Typography>
              <Typography component="p">
                Istanbul is a major city in Turkey that straddles Europe and
                Asia across the Bosphorus Strait. Its Old City reflects cultural
                influences of the many empires that once ruled here.
              </Typography>
            </CardContent>
          </Card>
        </InfoWindow>
      </CurrentLocation>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY,
})(GoogleMapContainer)
