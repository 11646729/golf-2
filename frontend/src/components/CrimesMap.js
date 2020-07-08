import React, { Fragment, useState, useRef } from "react"
import GoogleMapReact from "google-map-react"
import useSwr from "swr"
import useSupercluster from "use-supercluster"
import moment from "moment"
import MomentUtils from "@date-io/moment"
import {
  Typography,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
} from "@material-ui/core"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

import "../App.css"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

const Marker = ({ children }) => children

export default function CrimesMapContainer() {
  // State
  const mapRef = useRef()
  const [mapBounds, setBounds] = useState(null)
  const [mapZoom, setZoom] = useState(
    parseFloat(process.env.REACT_APP_CRIMES_DEFAULT_ZOOM)
  )
  const [mapCenter, setMapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })

  const [homeCheckboxState, setHomeCheckboxState] = useState(true)
  const [recentDataCheckboxState, setRecentDataCheckboxState] = useState(true)
  const [
    recentDataCheckboxEnabledState,
    setRecentDataCheckboxEnabledState,
  ] = useState(true)

  const [dateInfo, setDateInfo] = useState("")
  const [selectedDate, handleDateChange] = useState("")

  console.log(
    "Selected Date: " +
      "&date=" +
      moment(selectedDate).format("YYYY") +
      "-" +
      moment(selectedDate).format("MM")
  )

  const handleHomeCheckboxChange = (event) => {
    setHomeCheckboxState(event.target.checked)
    setZoom(parseFloat(process.env.REACT_APP_CRIMES_DEFAULT_ZOOM))
    if (event.target.checked === true) {
      setMapCenter({
        lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
        lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
      })
    } else {
      setMapCenter({
        lat: parseFloat(process.env.REACT_APP_ANDREA_HOME_LATITUDE),
        lng: parseFloat(process.env.REACT_APP_ANDREA_HOME_LONGITUDE),
      })
    }
  }

  const handleRecentDataCheckboxChange = (event) => {
    setRecentDataCheckboxState(event.target.checked)
    setRecentDataCheckboxEnabledState(event.target.checked)
    if (event.target.checked === true) {
      setDateInfo(
        "&date=" +
          moment(selectedDate).format("YYYY") +
          "-" +
          moment(selectedDate).format("MM")
      )
    } else {
      setDateInfo("")
    }
  }

  const markerClicked = (marker) => {
    console.log("clicked...")
    console.log("The marker that was clicked is", marker)
  }

  const styles = {
    displayHomeLocationCheckBox: {
      marginTop: "0px",
      marginLeft: "100px",
    },
    displayRecentDataCheckBox: {
      marginTop: "0px",
      marginLeft: "100px",
    },
    displayDatePicker: {
      marginTop: "0px",
      marginLeft: "40px",
    },
  }

  // build Crimes Url - set dateInfo to "" to fetch most recent data
  let crimesUrl =
    process.env.REACT_APP_CRIMES_ENDPOINT +
    "?lat=" +
    mapCenter.lat +
    "&lng=" +
    mapCenter.lng +
    dateInfo

  console.log(crimesUrl)

  // Now fetch crimes data
  const { data, error } = useSwr(crimesUrl, { fetcher })
  const crimes = data && !error ? data.slice(0, 2000) : []

  // Now reformat relevant crimes data to use with supercluster
  const reformattedCrimes = crimes.map((crime) => ({
    type: "Feature",
    properties: { cluster: false, crimeId: crime.id, category: crime.category },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(crime.location.longitude),
        parseFloat(crime.location.latitude),
      ],
    },
  }))

  // Now use supercluster via useSupercluster hook
  const { clusters, supercluster } = useSupercluster({
    points: reformattedCrimes,
    bounds: mapBounds,
    zoom: mapZoom,
    options: { radius: 75, maxZoom: 20 },
  })

  return (
    <Fragment>
      <CssBaseline />
      <Grid container spacing={1}>
        <Container maxWidth="xl">
          <Grid item xs={12} sm={12} style={{ marginTop: 50 }}>
            <Typography
              style={{ display: "inline-block" }}
              component="h4"
              variant="h5"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Crimes Dashboard
            </Typography>
            <FormControlLabel
              style={styles.displayHomeLocationCheckBox}
              control={
                <Checkbox
                  color="primary"
                  checked={homeCheckboxState}
                  onChange={handleHomeCheckboxChange}
                  name="homeCheckbox"
                />
              }
              label="Home Location"
              labelPlacement="end"
            />
            <FormControlLabel
              style={styles.displayRecentDataCheckBox}
              control={
                <Checkbox
                  color="primary"
                  checked={recentDataCheckboxState}
                  onChange={handleRecentDataCheckboxChange}
                  name="recentDataCheckbox"
                />
              }
              label="Most Recent Data"
              labelPlacement="end"
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                style={styles.displayDatePicker}
                name="datePicker"
                views={["year", "month"]}
                label="Year and Month"
                minDate={new Date("2018-01-01")}
                maxDate={new Date("2020-07-01")}
                disabled={recentDataCheckboxEnabledState}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Container>
        <Container maxWidth="xl">
          <Grid item xs={12} sm={12}>
            <div style={{ height: "580px", width: "100%", marginTop: 20 }}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
                center={mapCenter}
                zoom={mapZoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => {
                  mapRef.current = map
                }}
                onClick={(event) => {
                  setHomeCheckboxState(false)
                  setMapCenter({
                    lat: event.lat,
                    lng: event.lng,
                  })
                }}
                onChange={({ zoom, bounds }) => {
                  setZoom(zoom)
                  setBounds([
                    bounds.nw.lng,
                    bounds.se.lat,
                    bounds.se.lng,
                    bounds.nw.lat,
                  ])
                }}
              >
                {clusters.map((cluster) => {
                  const [longitude, latitude] = cluster.geometry.coordinates
                  const {
                    cluster: isCluster,
                    point_count: pointCount,
                  } = cluster.properties

                  if (isCluster) {
                    return (
                      <Marker
                        key={`cluster-${cluster.id}`}
                        lat={latitude}
                        lng={longitude}
                      >
                        <div
                          className="cluster-marker"
                          style={{
                            width: `${
                              10 + (pointCount / reformattedCrimes.length) * 20
                            }px`,
                            height: `${
                              10 + (pointCount / reformattedCrimes.length) * 20
                            }px`,
                          }}
                          onClick={() => {
                            const expansionZoom = Math.min(
                              supercluster.getClusterExpansionZoom(cluster.id),
                              20
                            )
                            mapRef.current.setZoom(expansionZoom)
                            mapRef.current.panTo({
                              lat: latitude,
                              lng: longitude,
                            })
                          }}
                        >
                          {pointCount}
                        </div>
                      </Marker>
                    )
                  }

                  return (
                    <Marker
                      key={`crime-${cluster.properties.crimeId}`}
                      lat={latitude}
                      lng={longitude}
                    >
                      <button
                        className="crime-marker"
                        onClick={() => markerClicked(cluster)}
                      >
                        <img
                          src="/static/images/Custody.svg"
                          alt="crime doesn't pay"
                        />
                      </button>
                    </Marker>
                  )
                })}
              </GoogleMapReact>
            </div>
          </Grid>
        </Container>
      </Grid>
    </Fragment>
  )
}
