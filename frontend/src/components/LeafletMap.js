import React, { createRef, Component } from "react"
import { Map, TileLayer, Marker, Popup, FeatureGroup } from "react-leaflet"
import L from "leaflet"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import "leaflet/dist/leaflet.css"

class LeafletMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      map: [],
      open: false,
      bounds: null,
      center: [35.000074, 104.999927],
    }
    this.mapRef = createRef()
    this.groupRef = createRef()
  }

  toggleHiddden = () => {
    this.setState({
      open: false,
    })
  }

  async componentDidMount() {
    try {
      await fetch(`https://coronaviva.herokuapp.com/api/1/infected/data/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer F9bQK456iUpJVZJLTZsMEKhhENqnGJ",
        },
      })
        .then((map) => map.json())
        .then((map) => {
          this.setState({
            map,
          })
        })
    } catch (err) {
      console.log(err)
    }

    let mapInst = this.mapRef.current.leafletElement
    const group = this.groupRef.current.leafletElement //get native featureGroup instance
    mapInst.fitBounds(group.getBounds())
  }

  // centerUpdated(center) {
  //   this.center = center;
  // }
  // boundsUpdated(bounds) {
  //   this.bounds = bounds;
  // }

  render() {
    const { map } = this.state

    const pointerIcon = new L.Icon({
      iconUrl:
        "https://icons.iconarchive.com/icons/paomedia/small-n-flat/512/map-marker-icon.png",
      iconAnchor: [25, 40],
      iconSize: [50, 50],
    })
    return (
      <div>
        {/* <Header
          state={this.state}
          load={this.onChange}
          submit={this.handleSubmit}
        /> */}
        <Map
          center={[51.9194, 19.1451]}
          style={{ height: "100vh", width: "auto" }}
          zoom={6}
          ref={this.mapRef}
          bounceAtZoomLimits={true}
          maxBoundsViscosity={0.95}
          maxBounds={[
            [-180, -90],
            [180, 90],
          ]}
          className="map_map margin-zero map-padding"
        >
          <FeatureGroup ref={this.groupRef}>
            {map.map((c, index) => (
              <Marker
                position={[c.latitude, c.longitude]}
                icon={pointerIcon}
                onclick={this.toggleHiddden}
                key={`markers-${index}`}
              >
                <Popup autoPan={false}>
                  <Card className="carrr">
                    {c.location === "Israel" ? (
                      <img
                        className="image"
                        src="https://thehill.com/sites/default/files/styles/article_full/public/telaviv_skyline_09202018.jpg?itok=pxhk1Rtl"
                        alt="Contemplative Reptile"
                      />
                    ) : (
                      <img
                        className="image"
                        src="https://www.dwf.law/-/media/DWF/Images/Locations-Assets/Warsaw/Warsaw-700-x-388.ashx"
                        alt="Contemplative Reptile"
                      />
                    )}
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {c.location && <span> Place : {c.location} </span>}
                      </Typography>

                      <h6>Address : {c.address}</h6>
                      <p className="text-dark" style={{ marginTop: "-5px" }}>
                        {c.info && (
                          <span>
                            <strong> Info</strong>: {c.info}{" "}
                          </span>
                        )}
                      </p>

                      <p
                        color="textSecondary text-secondary"
                        component="p"
                        className="lodl"
                      >
                        PlaceType : {c.place_type}
                        <br />
                        {c.start_hour && (
                          <span>
                            Start Hour : {c.start_hour}{" "}
                            {c.start_hour > "12" ? "PM" : "AM"}
                          </span>
                        )}
                        <br />
                        {c.end_hour && (
                          <span>
                            End Hour : {c.end_hour}{" "}
                            {c.end_hour > "12" ? "PM" : "AM"}
                          </span>
                        )}
                      </p>
                    </CardContent>
                  </Card>
                </Popup>
              </Marker>
            ))}
          </FeatureGroup>

          <TileLayer
            noWrap={true}
            // url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            // subdomains="1234"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>  '
          />
        </Map>
      </div>
    )
  }
}

export default LeafletMap
