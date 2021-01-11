// import React, { useState, useEffect } from "react"
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   Polyline,
//   InfoWindow,
// } from "@react-google-maps/api"
// import {
//   Typography,
//   CssBaseline,
//   Grid,
//   FormControlLabel,
//   Checkbox,
//   Paper,
//   makeStyles,
// } from "@material-ui/core"
// import Title from "./Title"
// import LoadingTitle from "./LoadingTitle"
// import CheckboxList from "./CheckboxList"
// import getAllReducedRoutes from "./getAllReducedRoutes"
// import getAllReducedStops from "./getAllReducedStops"

// const useStyles = makeStyles({
//   divStyle: {
//     background: "white",
//     border: "1px solid #ccc",
//     padding: 15,
//   },
//   headerSelection: {
//     marginTop: 55,
//     marginLeft: 20,
//   },
//   routeSelection: {
//     marginRight: 20,
//     marginBottom: 50,
//     height: "600px",
//     square: true,
//     border: "1px solid #ccc",
//     backgroundColor: "none", // "red",
//   },
// })

// export default function GTFSTransportMapContainer() {
//   const classes = useStyles()
//   // export default function RenderMap(props) {
//   //   const classes = useStyles(props)

//   //   // -----------------------------------------------------
//   //   // STATE HOOKS
//   //   // -----------------------------------------------------
//   const [mapRef, setMapRef] = useState(null)
//   const newLocal = parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM, 10)
//   const [mapZoom] = useState(newLocal)
//   const [mapCenter] = useState({
//     lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
//     lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
//   })
//   const { isLoaded, mapLoadError } = useLoadScript({
//     googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
//   })

//   const [busStopsCheckboxSelected, setBusStopsCheckbox] = useState(false)
//   const [busRoutesCheckboxSelected, setBusRoutesCheckbox] = useState(true)

//   const [busStopSelected, setBusStopSelected] = useState(null)
//   const [busRouteSelected, setBusRouteSelected] = useState(null)

//   // -----------------------------------------------------
//   // DATA HOOKS SECTION
//   // -----------------------------------------------------
//   const [busRoutesCollection, setBusRoutesCollection] = useState([])
//   const [busStopsCollection, setBusStopsCollection] = useState([])
//   const [errorLoading, setLoadingError] = useState([])

//   useEffect(() => {
//     let isSubscribed = true

//     getAllReducedStops()
//       .then((busStopsResult) =>
//         isSubscribed ? setBusStopsCollection(busStopsResult) : null
//       )
//       .catch((error) => (isSubscribed ? setLoadingError(error) : null))

//     // isSubscribed = false
//     // return isSubscribed
//     return () => (isSubscribed = false)
//   }, [])

//   console.log(props.busStopsCollection)

//   // Now compute bounds of map to display
//   if (mapRef && props.busStopsCollection != null) {
//     const bounds = new window.google.maps.LatLngBounds()
//     props.busStopsCollection.map((busStop) => {
//       const myLatLng = new window.google.maps.LatLng({
//         lat: busStop.shapeCoordinates.lat,
//         lng: busStop.shapeCoordinates.lng,
//       })
//       bounds.extend(myLatLng)
//       return bounds
//     })
//     mapRef.fitBounds(bounds)
//   }

//   useEffect(() => {
//     let isSubscribed = true

//     getAllReducedRoutes()
//       .then((busRoutesResult) =>
//         isSubscribed ? setBusRoutesCollection(busRoutesResult) : null
//       )
//       .catch((error) => (isSubscribed ? setLoadingError(error) : null))

//     // isSubscribed = false
//     // return isSubscribed
//     return () => (isSubscribed = false)
//   }, [])

//   // console.log(busRoutesCollection)

//   // -----------------------------------------------------
//   // EVENT HANDLERS SECTION
//   // -----------------------------------------------------
//   // Store a reference to the google map instance
//   const onLoadHandler = (map) => {
//     setMapRef(map)
//   }

//   // Clear the reference to the google map instance
//   const onUnmountHandler = () => {
//     setMapRef(null)
//   }

//   const handleBusStopsCheckboxChange = (event) => {
//     setBusStopsCheckbox(event.target.checked)
//   }

//   const handleBusRoutesCheckboxChange = (event) => {
//     setBusRoutesCheckbox(event.target.checked)
//   }

//   const handleBusStopClick = (event) => {
//     console.log(event)
//     // console.log(busStopSelected)
//     // setBusStopSelected(busStop)
//   }

//   const handleBusRouteClick = (event) => {
//     console.log(event)
//     // console.log(busRouteSelected)
//     // setBusRouteSelected(busRoute)
//   }

//   // -----------------------------------------------------
//   // VIEW SECTION
//   // -----------------------------------------------------
//   // export default function RenderMap(props) {
//   //   const classes = useStyles(props)

//   return (
//     <div>
//       <CssBaseline />
//       <Grid container spacing={1}>
//         <Grid item xs={12} sm={12}>
//           <div className={classes.headerSelection}>
//             <Title>GTFS Transport UI Test</Title>
//             {!props.errorLoading ? (
//               <LoadingTitle>Error Loading...</LoadingTitle>
//             ) : null}
//           </div>
//         </Grid>
//         <Grid item xs={12} sm={9}>
//           <GoogleMap
//             mapContainerStyle={{
//               height: "600px",
//               border: "1px solid #ccc",
//               marginLeft: 20,
//               marginRight: 10,
//               marginBottom: 50,
//             }}
//             center={mapCenter}
//             zoom={mapZoom}
//             options={{
//               // mapTypeId: "hybrid",
//               disableDefaultUI: true,
//               zoomControl: true,
//             }}
//             onLoad={onLoadHandler}
//             onUnmount={onUnmountHandler}
//           >
//             {props.busRoutesCollection && props.busRoutesCheckboxSelected
//               ? props.busRoutesCollection.map((busRoute) => (
//                   <Polyline
//                     key={busRoute.shapeKey}
//                     path={busRoute.shapeCoordinates}
//                     options={{
//                       strokeColor: busRoute.routeColor,
//                       strokeOpacity: "1.0",
//                       strokeWeight: 2,
//                     }}
//                     onClick={() => {
//                       // handleBusRouteClick()
//                     }}
//                   />
//                 ))
//               : null}
//             {props.busStopsCollection && props.busStopsCheckboxSelected
//               ? props.busStopsCollection.map((busStop) => (
//                   <Marker
//                     key={busStop.shapeKey}
//                     position={{
//                       lat: busStop.shapeCoordinates.lat,
//                       lng: busStop.shapeCoordinates.lng,
//                     }}
//                     icon={{
//                       path: window.google.maps.SymbolPath.CIRCLE,
//                       scale: 2,
//                       // url: "http://maps.google.com/mapfiles/ms/icons/blue.png",
//                     }}
//                     onClick={() => {
//                       // handleBusStopClick()
//                     }}
//                   />
//                 ))
//               : null}
//             {/* {busStopSelected ? (
//               <InfoWindow
//                 position={{
//                   lat: busStopSelected.stop_lat,
//                   lng: busStopSelected.stop_lon,
//                 }}
//                 onCloseClick={() => {
//                   setBusStopSelected(null)
//                 }}
//               >
//                 <div style={classes.divStyle}>
//                   <Typography gutterBottom variant="h5" component="h2">
//                     {busStopSelected.stop_name}
//                   </Typography>
//                 </div>
//               </InfoWindow>
//             ) : null} */}
//           </GoogleMap>
//         </Grid>
//         <Grid item xs={12} sm={3}>
//           <Paper className={classes.routeSelection}>
//             {!props.errorLoading ? (
//               <LoadingTitle>Error Loading...</LoadingTitle>
//             ) : null}
//             <FormControlLabel
//               style={{
//                 marginTop: "10px",
//                 marginLeft: "20px",
//               }}
//               control={
//                 <Checkbox
//                   color="primary"
//                   checked={busStopsCheckboxSelected}
//                   onChange={handleBusStopsCheckboxChange}
//                   name="busStopsCheckbox"
//                 />
//               }
//               label="Display Bus Stops"
//               labelPlacement="end"
//             />
//             <FormControlLabel
//               style={{
//                 marginTop: "0px",
//                 marginLeft: "20px",
//               }}
//               control={
//                 <Checkbox
//                   color="primary"
//                   checked={busRoutesCheckboxSelected}
//                   onChange={handleBusRoutesCheckboxChange}
//                   name="busRoutesCheckbox"
//                 />
//               }
//               label="Display Bus Routes"
//               labelPlacement="end"
//             />
//             {/* console.log(busRoutesCollection[0]) */}
//             <CheckboxList
//               // Parameters
//               busRouteColor="#87cefa"
//               busRouteNumber="200"
//               busRouteName="San Rafael - Sausalito"
//               busRouteVia="via Strawberry, Mill Valley"
//             />
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   )
//   // }

//   if (mapLoadError) {
//     return <div>Map cannot be loaded right now, sorry.</div>
//   }

//   return isLoaded ? RenderMap() : null
// }
