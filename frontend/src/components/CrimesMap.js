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
  Box,
} from "@material-ui/core"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"

import "../App.css"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

const Marker = ({ children }) => children

export default function CrimesMapContainer(props) {
  // State
  const mapRef = useRef()
  const [bounds, setBounds] = useState(null)
  const [zoom, setZoom] = useState(10)
  const [homeCheckboxState, setHomeCheckboxState] = useState(true)
  const [homeCheckboxEnabledState, setHomeCheckboxEnabledState] = useState(true)
  const [recentDataCheckboxState, setRecentDataCheckboxState] = useState(true)
  const [crimesLocationLatitude, setCrimesLocationLatitude] = useState(
    process.env.REACT_APP_HOME_LATITUDE
  )
  const [crimesLocationLongitude, setCrimesLocationLongitude] = useState(
    process.env.REACT_APP_HOME_LONGITUDE
  )
  const [dateInfo, setDateInfo] = useState("")
  const [selectedDate, handleDateChange] = useState()
  const [helperTextState, setHelperTextState] = useState("Default")

  const handleRecentDataCheckboxChange = (event) => {
    setRecentDataCheckboxState(event.target.checked)
    setHomeCheckboxEnabledState(event.target.checked)
    if (event.target.checked === true) {
      setDateInfo(
        "&date=" +
          moment(selectedDate).format("YYYY") +
          "-" +
          moment(selectedDate).format("MM")
      )
      setHelperTextState("")
    } else {
      setDateInfo("")
      setHelperTextState("Click on map to fetch Crimes")
    }
  }

  const handleHomeCheckboxChange = (event) => {
    setHomeCheckboxState(event.target.checked)
    if (event.target.checked === true) {
      setCrimesLocationLatitude(process.env.REACT_APP_HOME_LATITUDE)
      setCrimesLocationLongitude(process.env.REACT_APP_HOME_LONGITUDE)
    } else {
      setCrimesLocationLatitude("54.695882")
      setCrimesLocationLongitude("-5.857359")
    }
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

  // const crimesUrl =
  //   "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10"

  // build Crimes Url - use place only to fetch most recent data
  let crimesUrl =
    process.env.REACT_APP_CRIMES_ENDPOINT +
    "?lat=" +
    crimesLocationLatitude +
    "&lng=" +
    crimesLocationLongitude +
    dateInfo

  const { data, error } = useSwr(crimesUrl, { fetcher })
  const crimes = data && !error ? data.slice(0, 2000) : []
  const points = crimes.map((crime) => ({
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

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 },
  })

  return (
    <Fragment>
      <CssBaseline />
      <Grid container spacing={1}>
        <Container maxWidth="xl">
          <Grid item xs={12} sm={12} style={{ marginTop: 50 }}>
            {/* <Box bgcolor="warning.main" color="warning.contrastText" p={2}> */}
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
                  // helperText={helperTextState}
                  // helperText="Test"
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
                disabled={homeCheckboxEnabledState}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </MuiPickersUtilsProvider>
            {/* </Box> */}
          </Grid>
        </Container>
        <Container maxWidth="xl">
          <Grid item xs={12} sm={12}>
            <Box height="600px" p={2}>
              <GoogleMapReact
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
                defaultCenter={props.center}
                defaultZoom={props.zoom}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({ map }) => {
                  mapRef.current = map
                }}
                onClick={(event) => {
                  setHomeCheckboxState(false)
                  setCrimesLocationLatitude(event.lat)
                  setCrimesLocationLongitude(event.lng)
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
                              10 + (pointCount / points.length) * 20
                            }px`,
                            height: `${
                              10 + (pointCount / points.length) * 20
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
                      <button className="crime-marker">
                        <img
                          src="/static/images/Custody.svg"
                          alt="crime doesn't pay"
                        />
                      </button>
                    </Marker>
                  )
                })}
              </GoogleMapReact>
            </Box>
          </Grid>
        </Container>
      </Grid>
    </Fragment>
  )
}
