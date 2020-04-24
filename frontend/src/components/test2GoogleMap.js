import React, { Component } from "react"
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react"

const mapStyles = {
  width: "100%",
  height: "300px",
}

let geocoder
let addressData = [
  { location: "146 Pierrepont St, Brooklyn, NY, USA" },
  { location: "153 Remsen St, Brooklyn, NY, USA" },
]

export class MapContainer extends Component {
  constructor(props) {
    super(props)
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.displayMarkers = this.displayMarkers.bind(this)
    this.state = {
      lat: 40.6946768,
      lng: -73.99161700000002,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      places: [],
      stores: [
        { latitude: 47.49855629475769, longitude: -122.14184416996333 },
        { latitude: 47.359423, longitude: -122.021071 },
        { latitude: 47.2052192687988, longitude: -121.988426208496 },
        { latitude: 47.6307081, longitude: -122.1434325 },
        { latitude: 47.3084488, longitude: -122.2140121 },
        { latitude: 47.5524695, longitude: -122.0425407 },
      ],
    }
  }

  componentDidMount() {
    this.plotPoints()
  }

  plotPoints() {
    let locations = this.getPoints(geocoder)
    let places = []

    Promise.all(locations).then((returnVals) => {
      returnVals.forEach((latLng) => {
        let place = {
          latitude: latLng[0],
          longitude: latLng[1],
        }
        places.push(place)
      })
      // places now populated
      this.setState(() => {
        return {
          places: places,
        }
      })
    })
  }

  getPoints(geocoder) {
    let locationData = []
    for (let i = 0; i < addressData.length; i++) {
      locationData.push(this.findLatLang(addressData[i].location, geocoder))
    }
    return locationData // array of promises
  }

  findLatLang(address, geocoder) {
    return new Promise(function (resolve, reject) {
      geocoder.geocode(
        {
          address: address,
        },
        function (results, status) {
          if (status === "OK") {
            console.log(results)
            resolve([
              results[0].geometry.location.lat(),
              results[0].geometry.location.lng(),
            ])
          } else {
            reject(new Error("Couldnt't find the location " + address))
          }
        }
      )
    })
  }

  displayMarkers(stores) {
    return stores.map((place, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: place.latitude,
            lng: place.longitude,
          }}
          onClick={() => console.log("You clicked me!")}
        />
      )
    })
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    })
  }

  render() {
    geocoder = new this.props.google.maps.Geocoder()
    return (
      <div className="container place-map">
        <div className="row">
          <div className="col-md-12">
            <Map
              google={this.props.google}
              zoom={14}
              style={mapStyles}
              initialCenter={{
                lat: this.state.lat,
                lng: this.state.lng,
              }}
            >
              {this.displayMarkers(this.state.stores)}
              {this.displayMarkers(this.state.places)}
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}
              >
                <div>Your Location Here!</div>
              </InfoWindow>
            </Map>
          </div>
        </div>
      </div>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_KEY,
})(MapContainer)
