import React, { Fragment, useState, useEffect, useRef } from "react"
import axios from "axios"
import GoogleMapReact from "google-map-react"
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
  const [homeCheckbox, setHomeCheckbox] = useState(true)
  const [latestDataCheckbox, setLatestDataCheckbox] = useState(true)
  const [latestDataCheckboxEnabled, setLatestDataCheckboxEnabled] = useState(
    true
  )
  const [crimes, setData] = useState([])
  // dateInfo e.g. &date=2020-05 is the date string to be appended to the coordinates for downloading data
  const [dateInfo, setDateInfo] = useState("")
  // selectedDate e.g. 2020-04 is the date chosen by the user to obtain data
  const [selectedDate, setDateChange] = useState("")
  // latestDateInfoAvailable e.g. 2020-05 is the date of the latest available data ready for download
  const [latestDateInfoAvailable, setLatestDateInfoAvailable] = useState("")

  // Event Handlers
  const handleHomeCheckboxChange = (event) => {
    setHomeCheckbox(event.target.checked)
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

  const handleLatestDataCheckboxChange = (event) => {
    setLatestDataCheckbox(event.target.checked)
    setLatestDataCheckboxEnabled(event.target.checked)

    if (event.target.checked === false) {
      setDateInfo(
        "&date=" +
          moment(selectedDate).format("YYYY") +
          "-" +
          moment(selectedDate).format("MM")
      )
    } else {
      setDateInfo("")
      setDateChange(latestDateInfoAvailable)
    }
  }

  const handleDateInfoChange = (val) => {
    setDateInfo(
      "&date=" +
        moment(val._d).format("YYYY") +
        "-" +
        moment(val._d).format("MM")
    )
  }

  // const markerClicked = (marker) => {
  //   console.log("clicked...")
  //   console.log("The marker that was clicked is", marker)
  // }

  const styles = {
    displayHomeLocationCheckBox: {
      marginTop: "0px",
      marginLeft: "100px",
    },
    displayLatestDataCheckBox: {
      marginTop: "0px",
      marginLeft: "100px",
    },
    displayDatePicker: {
      marginTop: "0px",
      marginLeft: "40px",
    },
    latestDateText: {
      display: "inline-block",
      marginTop: "-20px",
      marginLeft: "580px",
    },
  }

  // build Crimes Url - set dateInfo to "" to fetch most recent data
  let url =
    process.env.REACT_APP_CRIMES_ENDPOINT +
    "?lat=" +
    mapCenter.lat +
    "&lng=" +
    mapCenter.lng +
    dateInfo

  // Now fetch crimes data
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url)
      setData(result.data)
    }
    fetchData()
  }, [homeCheckbox, latestDataCheckbox, dateInfo, url])

  // Now reformat relevant crimes data to use with supercluster
  const reformattedCrimes = crimes.map((crime) => ({
    type: "Feature",
    properties: {
      cluster: false,
      crimeId: crime.id,
      category: crime.category,
      month: crime.month,
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(crime.location.longitude),
        parseFloat(crime.location.latitude),
      ],
    },
  }))

  if (reformattedCrimes.length > 0 && selectedDate === "") {
    setDateInfo("&date=" + reformattedCrimes[0].properties.month)
    setLatestDateInfoAvailable(reformattedCrimes[0].properties.month)
    setDateChange(
      moment(reformattedCrimes[0].properties.month).format("YYYY") +
        "-" +
        moment(reformattedCrimes[0].properties.month).format("MM")
    )
  }

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
                  checked={homeCheckbox}
                  onChange={handleHomeCheckboxChange}
                  name="homeCheckbox"
                />
              }
              label="Home Location"
              labelPlacement="end"
            />
            <FormControlLabel
              style={styles.displayLatestDataCheckBox}
              control={
                <Checkbox
                  color="primary"
                  checked={latestDataCheckbox}
                  onChange={handleLatestDataCheckboxChange}
                  name="latestDataCheckbox"
                />
              }
              label="Latest Data"
              labelPlacement="end"
            />
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <DatePicker
                style={styles.displayDatePicker}
                name="datePicker"
                views={["year", "month"]}
                label="Year and Month"
                minDate={new Date("2018-01-01")}
                maxDate={new Date("2020-06-01")}
                disabled={latestDataCheckboxEnabled}
                value={selectedDate}
                onChange={(val) => {
                  setDateChange(val)
                  handleDateInfoChange(val)
                }}
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
                  setHomeCheckbox(false)
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
                    <Fragment>
                      <Marker
                        key={`crime-${cluster.properties.crimeId}`}
                        lat={latitude}
                        lng={longitude}
                      >
                        <button
                          className="crime-marker"
                          // onClick={() => markerClicked(cluster)}
                        >
                          <img
                            src="/static/images/Custody.svg"
                            alt="crime doesn't pay"
                          />
                        </button>
                        {/* <div className="cluster-infowindow">
                          Category: {cluster.properties.category}
                        </div> */}
                      </Marker>
                    </Fragment>
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
