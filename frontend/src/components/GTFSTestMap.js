import React, { useState, useEffect } from "react"
import axios from "axios"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  Polyline,
  InfoWindow,
} from "@react-google-maps/api"
import {
  Typography,
  CssBaseline,
  Grid,
  FormControlLabel,
  Checkbox,
  Paper,
  makeStyles,
} from "@material-ui/core"
import Title from "./Title"
import LoadingTitle from "./LoadingTitle"
import CheckboxList from "./CheckboxList"

const useStyles = makeStyles({
  // polyline1: {
  //   strokeColor: "#ff2343",
  //   strokeOpacity: "1.0",
  //   strokeWeight: 2,
  // },
  polyline2: {
    strokeColor: "#0000ff",
    strokeOpacity: "1.0",
    strokeWeight: 2,
  },
  divStyle: {
    background: "white",
    border: "1px solid #ccc",
    padding: 15,
  },
  headerSelection: {
    marginTop: 55,
    marginLeft: 20,
  },
  routeSelection: {
    marginRight: 20,
    marginBottom: 50,
    height: "600px",
    square: true,
    border: "1px solid #ccc",
    backgroundColor: "none", // "red",
  },
})

export default function GTFSTestMapContainer() {
  const classes = useStyles()

  // -----------------------------------------------------
  // STATE HOOKS
  // -----------------------------------------------------
  const [mapRef, setMapRef] = useState(null)
  const newLocal = parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM, 10)
  const [mapZoom] = useState(newLocal)
  const [mapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })
  const { isLoaded, mapLoadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  const [busStopsCheckboxSelected, setBusStopsCheckbox] = useState(true)
  const [busShapesCheckboxSelected, setBusShapesCheckbox] = useState(true)

  const [busStopSelected, setBusStopSelected] = useState(null)
  const [busShapeSelected, setBusShapeSelected] = useState(null)

  // -----------------------------------------------------
  // DATA HOOKS SECTION
  // -----------------------------------------------------
  const [busRoutesFilenames, setBusRoutesFilenames] = useState([])
  const [busRoutesCollection, setBusRoutesCollection] = useState([])
  const [busRoute, setBusRoute] = useState([])
  const [filteredBusRoute, setFilteredBusRoute] = useState([])
  const [busStopsCollection, setBusStopsCollection] = useState([])
  const [errorLoading, setLoadingError] = useState([])

  // Fetch the list of GeoJson filenames
  // const getBusRouteFilenames = async () => {
  //   const filePath = "http://localhost:5000/api/gtfsTransport/filenames"
  //   const busRoutesResult = await axios.get(filePath)
  //   setBusRoutesFilenames(busRoutesResult.data)
  // }

  // Fetch a unique list of GeoJson filenames irrespective of trip direction
  const getUniqueBusRouteFilenameList = async () => {
    const filePath = "http://localhost:5000/api/gtfsTransport/filenames"
    const busRoutesResult = await axios.get(filePath)
    setBusRoutesFilenames(busRoutesResult.data)
  }

  // let selectedRoute = busRoutesFilenames[0]

  const getSingleBusRoute = async () => {
    let res = await axios({
      url: "http://localhost:5000/api/gtfsTransport/routes/:id",
      method: "get",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    })
    // Test for Status - 200 is a Success response code
    if (res.status === 200) {
      setBusRoute(res.data.features)
    }
  }

  if (busRoute.length > 0) {
    console.log(busRoute)
  }

  const reformatBusRoute = async (busRoute) => {
    busRoute.map((busRouteShape, index) => {
      if (busRouteShape.geometry.type === "LineString") {
        let info = {
          markerType: busRouteShape.geometry.type,
          routeKey: index,
          routeColor: busRouteShape.properties.route_color,
          routeLongName: busRouteShape.properties.route_long_name,
          routeShortName: busRouteShape.properties.route_short_name,
          routeCoords: busRouteShape.geometry.coordinates,
          routeCoordsLength: busRouteShape.geometry.coordinates.length,
          googleMapsCoords: null,
        }

        let i = 0
        let tempGoogleMapsCoords = []
        let tempCoords = []
        do {
          tempCoords = [
            busRouteShape.geometry.coordinates[i][1],
            busRouteShape.geometry.coordinates[i][0],
          ]
          tempGoogleMapsCoords.push(tempCoords)

          tempCoords = []
          i++
        } while (i < busRouteShape.geometry.coordinates.length)

        info.googleMapsCoords = tempGoogleMapsCoords

        // console.log(info)
        setFilteredBusRoute(info)
        // return info
      }

      if (busRouteShape.geometry.type === "Point") {
        let info = {
          markerType: busRouteShape.geometry.type,
          routeKey: index,
          stopName: busRouteShape.properties.stop_name,
          stopCoords: busRouteShape.geometry.coordinates,
          googleMapsCoords: [
            busRouteShape.geometry.coordinates[1],
            busRouteShape.geometry.coordinates[0],
          ],
        }
        // setFilteredBusRoute(info)
        // return info
      }
    })
  }

  console.log(filteredBusRoute)

  useEffect(() => {
    // getBusRouteFilenames()
    getUniqueBusRouteFilenameList()
    getSingleBusRoute()
    // reformatBusRoute(busRoute)
  }, [])

  // console.log(busRoute)

  if (busRoutesFilenames.length !== 0) {
    let uniqueBusRouteFilenames = []
    let i = 0
    const substring = "_0.geojson"

    do {
      if (busRoutesFilenames[i].indexOf(substring) !== -1) {
        uniqueBusRouteFilenames.push(busRoutesFilenames[i])
      }
      i++
    } while (i < busRoutesFilenames.length)
    // setBusRoutesFilenames(uniqueBusRouteFilenames)
  }

  // console.log(busRoutesCollection)

  // Now compute bounds of map to display
  // if (mapRef && busStopsCollection != null) {
  //   const bounds = new window.google.maps.LatLngBounds()
  //   busStopsCollection.map((busStop) => {
  //     const myLatLng = new window.google.maps.LatLng({
  //       lat: busStop.stop_lat,
  //       lng: busStop.stop_lon,
  //     })
  //     bounds.extend(myLatLng)
  //     return bounds
  //   })
  //   mapRef.fitBounds(bounds)
  // }

  // -----------------------------------------------------
  // EVENT HANDLERS SECTION
  // -----------------------------------------------------
  // Store a reference to the google map instance
  const onLoadHandler = (map) => {
    setMapRef(map)
  }

  // Clear the reference to the google map instance
  const onUnmountHandler = () => {
    setMapRef(null)
  }

  const handleBusStopsCheckboxChange = (event) => {
    setBusStopsCheckbox(event.target.checked)
  }

  const handleBusShapesCheckboxChange = (event) => {
    setBusShapesCheckbox(event.target.checked)
  }

  // const handleBusStopClick = (event) => {
  //   console.log(busStopSelected)
  // }

  // const handleBusShapeClick = (event) => {
  //   console.log(busShapeSelected)
  // }

  // -----------------------------------------------------
  // VIEW SECTION
  // -----------------------------------------------------
  const renderMap = () => (
    <div>
      <CssBaseline />
      <Grid container spacing={1}>
        <Grid item xs={12} sm={12}>
          <div className={classes.headerSelection}>
            <Title>GTFS Transport UI Test</Title>
            {!errorLoading ? (
              <LoadingTitle>Error Loading...</LoadingTitle>
            ) : null}
          </div>
        </Grid>
        <Grid item xs={12} sm={9}>
          <GoogleMap
            mapContainerStyle={{
              height: "600px",
              border: "1px solid #ccc",
              marginLeft: 20,
              marginRight: 10,
              marginBottom: 50,
            }}
            center={mapCenter}
            zoom={mapZoom}
            options={{
              // mapTypeId: "hybrid",
              disableDefaultUI: true,
              zoomControl: true,
            }}
            onLoad={onLoadHandler}
            onUnmount={onUnmountHandler}
          >
            {busRoutesCollection.map((busRoute) => (
              <Polyline
                key={busRoute.routeKey}
                path={busRoute.googleMapsCoords}
                // options={classes.polyline1}
                options={{ strokeColor: busRoute.routeColor }}
                onClick={() => {
                  // setBusShapeSelected(busRoute)
                  // console.log(busShape)
                  // handleBusShapeClick()
                }}
              />
            ))}

            {/* {busStopsCollection && busStopsCheckboxSelected
              ? busStopsCollection.map((busStop) => (
                  <Marker
                    key={busStop.stop_id}
                    position={{
                      lat: busStop.stop_lat,
                      lng: busStop.stop_lon,
                    }}
                    icon={{
                      url: "http://maps.google.com/mapfiles/ms/icons/blue.png",
                    }}
                    onClick={() => {
                      setBusStopSelected(busStop)
                      // console.log(busStop)
                      // handleBusStopClick()
                    }}
                  />
                ))
              : null} */}
            {busStopSelected ? (
              <InfoWindow
                position={{
                  lat: busStopSelected.stop_lat,
                  lng: busStopSelected.stop_lon,
                }}
                onCloseClick={() => {
                  setBusStopSelected(null)
                }}
              >
                <div style={classes.divStyle}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {busStopSelected.stop_name}
                  </Typography>
                </div>
              </InfoWindow>
            ) : null}
          </GoogleMap>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Paper className={classes.routeSelection}>
            {!errorLoading ? (
              <LoadingTitle>Error Loading...</LoadingTitle>
            ) : null}
            <FormControlLabel
              style={{
                marginTop: "10px",
                marginLeft: "20px",
              }}
              control={
                <Checkbox
                  color="primary"
                  checked={busStopsCheckboxSelected}
                  onChange={handleBusStopsCheckboxChange}
                  name="busStopsCheckbox"
                />
              }
              label="Display Bus Stops"
              labelPlacement="end"
            />
            <FormControlLabel
              style={{
                marginTop: "0px",
                marginLeft: "20px",
              }}
              control={
                <Checkbox
                  color="primary"
                  checked={busShapesCheckboxSelected}
                  onChange={handleBusShapesCheckboxChange}
                  name="busShapesCheckbox"
                />
              }
              label="Display Bus Trip Shapes"
              labelPlacement="end"
            />
            <CheckboxList />
            {/* <RouteListItem
              // props
              busRouteNumber="28"
              busRouteName="San Rafael - Sausalito"
              busRouteVia="via Strawberry, Mill Valley"
            />
            <RouteListItem
              // props
              busRouteNumber="218"
              busRouteName="San Rafael - Sausalito"
              busRouteVia="via Strawberry, Mill Valley"
            /> */}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )

  if (mapLoadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
