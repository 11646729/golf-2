import React from "react"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import CardMedia from "@material-ui/core/CardMedia"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"

import Map from "./Map"
import InfoWindow from "./InfoWindow"

const useStyles = makeStyles(theme => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
}))

// createInfoWindow(e, map) {
//   const infoWindow = new window.google.maps.InfoWindow({
//     content: '<div id="infoWindow" />',
//     position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
//   })
//   infoWindow.addListener("domready", e => {
//     render(<InfoWindow />, document.getElementById("infoWindow"))
//   })
//   infoWindow.open(map)
// }

export default function CardMap() {
  const classes = useStyles()

  return (
    <Card className={classes.card}>
      <Map
        id="myMap"
        options={{
          center: { lat: 54.626792, lng: -5.884438 },
          zoom: 14
        }}
        onMapLoad={map => {
          var marker = new window.google.maps.Marker({
            position: { lat: 54.626792, lng: -5.884438 },
            map: map,
            title: "Hello Cruise Terminal!"
          })
          // marker.addListener("click", e => {
          //   this.createInfoWindow(e, map)
          // })
        }}
      />

      {/* <CardMedia
        className={classes.cardMedia}
        image="https://source.unsplash.com/random"
        title="Image title"
      />
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          3rd Card
        </Typography>
        <Typography>This is the 3rd Card</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
        <Button size="small" color="primary">
          Edit
        </Button>
      </CardActions> */}
    </Card>
  )
}

// import React, { Component } from "react"
// import { render } from "react-dom"
// import Navbar from "./components/NavBar"
// import Map from "./components/Map"
// import InfoWindow from "./components/InfoWindow"

// class CardMap extends Component {
//   constructor() {
//     super()
//     this.createInfoWindow = this.createInfoWindow.bind(this)
//   }

//   createInfoWindow(e, map) {
//     const infoWindow = new window.google.maps.InfoWindow({
//       content: '<div id="infoWindow" />',
//       position: { lat: e.latLng.lat(), lng: e.latLng.lng() }
//     })
//     infoWindow.addListener("domready", e => {
//       render(<InfoWindow />, document.getElementById("infoWindow"))
//     })
//     infoWindow.open(map)
//   }

//   render() {
//     return (
//       <div>
//         <Navbar />
//         <Map
//           id="myMap"
//           options={{
//             center: { lat: 54.626792, lng: -5.884438 },
//             zoom: 14
//           }}
//           onMapLoad={map => {
//             var marker = new window.google.maps.Marker({
//               position: { lat: 54.626792, lng: -5.884438 },
//               map: map,
//               title: "Hello Cruise Terminal!"
//             })
//             marker.addListener("click", e => {
//               this.createInfoWindow(e, map)
//             })
//           }}
//         />
//       </div>
//     )
//   }
// }

// export default App
