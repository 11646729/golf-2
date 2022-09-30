import React, { useState, useRef, memo } from "react"
import PropTypes from "prop-types"
// import axios from "axios"
import GoogleMapReact from "google-map-react"
import useSupercluster from "use-supercluster"
import moment from "moment"
// import MomentUtils from "@date-io/moment"
import {
  // Checkbox,
  Container,
  // FormControlLabel,
  Grid,
  // styled,
} from "@material-ui/core"
// import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import styled from "styled-components"

// import LoadingTitle from "./LoadingTitle"

const ClusterMarker = styled.div`
  color: #fff;
  background: #1978c8;
  border-radius: 50%;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const ClusterInfoWindow = styled.div`
  background-color: white;
  padding: 10px;
  width: 220px;
  bottom: 150px;
  left: -45px;
  box-shadow: "0 2px 7px 1px rgba(0, 0, 0, 0.3)";
  position: relative;
  font-size: 14;
  z-index: 100;
`

const CrimeMarker = styled.button`
  background: none;
  border: none;
`

const CrimeMarkerImage = styled.img`
  width: 25px;
`
const Marker = ({ children }) => children

const NearbyCrimesMap = (props) => {
  const { crimesData } = props

  NearbyCrimesMap.propTypes = {
    crimesData: PropTypes.array,
  }

  // State
  const mapRef = useRef()
  const [mapBounds, setBounds] = useState(null)
  const [mapZoom, setZoom] = useState(
    parseInt(process.env.REACT_APP_MAP_DEFAULT_ZOOM, 10)
  )
  const [mapCenter, setMapCenter] = useState({
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  })

  // const [homeCheckbox, setHomeCheckbox] = useState(true)
  // const [latestDataCheckbox, setLatestDataCheckbox] = useState(true)
  // const [latestDataCheckboxEnabled, setLatestDataCheckboxEnabled] =
  //   useState(true)
  // dateInfo e.g. &date=2020-05 is the date string to be appended to the coordinates for downloading data
  // const [dateInfo, setDateInfo] = useState("")
  // selectedDate e.g. 2020-04 is the date chosen by the user to obtain data
  const [selectedDate, setDateChange] = useState("")
  // latestDateInfoAvailable e.g. 2020-05 is the date of the latest available data ready for download
  // const [latestDateInfoAvailable, setLatestDateInfoAvailable] = useState("")
  // const [crimes, setData] = useState([])
  // const [dataLoading, setLoadingData] = useState(true)
  // const [errorLoading, setLoadingError] = useState("")

  // Event Handlers
  const handleHomeCheckboxChange = (event) => {
    // setHomeCheckbox(event.target.checked)
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

  // const handleLatestDataCheckboxChange = (event) => {
  //   setLatestDataCheckbox(event.target.checked)
  //   setLatestDataCheckboxEnabled(event.target.checked)

  //   if (event.target.checked === false) {
  //     setDateInfo(
  //       `&date=${moment(selectedDate).format("YYYY")}-${moment(
  //         selectedDate
  //       ).format("MM")}`
  //     )
  //   } else {
  //     setDateInfo("")
  //     setDateChange(latestDateInfoAvailable)
  //   }
  // }

  // const handleDateInfoChange = (val) => {
  //   setDateInfo(
  //     `&date=${moment(val._d).format("YYYY")}-${moment(val._d).format("MM")}`
  //   )
  // }

  // const markerClicked = (marker) => {
  //   console.log("clicked...")
  //   console.log("The marker that was clicked is", marker)
  // }

  // const styles = {
  //   displayHomeLocationCheckBox: {
  //     marginTop: "0px",
  //     marginLeft: "100px",
  //   },
  //   displayLatestDataCheckBox: {
  //     marginTop: "0px",
  //     marginLeft: "100px",
  //   },
  //   displayDatePicker: {
  //     marginTop: "0px",
  //     marginLeft: "40px",
  //   },
  //   latestDateText: {
  //     display: "inline-block",
  //     marginTop: "-20px",
  //     marginLeft: "580px",
  //   },
  // }

  // Now reformat relevant crimes data to use with supercluster
  const reformattedCrimes = crimesData.map((crime) => ({
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
    // setDateInfo(`&date=${reformattedCrimes[0].properties.month}`)
    // setLatestDateInfoAvailable(reformattedCrimes[0].properties.month)
    setDateChange(
      `${moment(reformattedCrimes[0].properties.month).format("YYYY")}-${moment(
        reformattedCrimes[0].properties.month
      ).format("MM")}`
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
    <div>
      {/* <Grid container spacing={1}> */}
      {/* <Container maxWidth="xl">
          <Grid item xs={12} sm={12} style={{ marginTop: 50 }}>
            {dataLoading ? <LoadingTitle>Loading...</LoadingTitle> : null}
            {errorLoading ? (
              <LoadingTitle>Error Loading...</LoadingTitle>
            ) : null}
          </Grid>
        </Container> */}

      {/* <Container maxWidth="xl">
        <Grid item xs={12} sm={12}> */}
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
            // setHomeCheckbox(false)
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
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties

            if (isCluster) {
              return (
                <Marker
                  key={`cluster-${cluster.id}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <ClusterMarker
                    role="button"
                    tabIndex="0"
                    // className="cluster-marker"
                    style={{
                      width: `${
                        10 + (pointCount / reformattedCrimes.length) * 20
                      }px`,
                      height: `${
                        10 + (pointCount / reformattedCrimes.length) * 20
                      }px`,
                    }}
                    onKeyDown={() => {
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
                  </ClusterMarker>
                </Marker>
              )
            }

            return (
              <div>
                <Marker
                  key={`crime-${cluster.properties.crimeId}`}
                  lat={latitude}
                  lng={longitude}
                >
                  <CrimeMarker
                    type="button"
                    // onClick={() => markerClicked(cluster)}
                  >
                    <CrimeMarkerImage
                      src="/static/images/Custody.svg"
                      alt="crime doesn't pay"
                    />
                  </CrimeMarker>
                  <ClusterInfoWindow>
                    Category: {cluster.properties.category}
                  </ClusterInfoWindow>
                </Marker>
              </div>
            )
          })}
        </GoogleMapReact>
      </div>
      {/* </Grid>
      </Container> */}
      {/* </Grid> */}
    </div>
  )
}

export default memo(NearbyCrimesMap)
