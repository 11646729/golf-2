import React, { useState, useRef } from "react"
import useSwr from "swr"
import GoogleMapReact from "google-map-react"
import useSupercluster from "use-supercluster"
import moment from "moment"
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Checkbox from "@material-ui/core/Checkbox"
import MomentUtils from "@date-io/moment"
import "../App.css"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

const Marker = ({ children }) => children

export default function CrimesMapContainer(props) {
  // State
  const mapRef = useRef()
  const [bounds, setBounds] = useState(null)
  const [zoom, setZoom] = useState(10)
  const [homeCheckboxState, setHomeCheckboxState] = useState(true)
  const [recentDataCheckboxState, setRecentDataCheckboxState] = useState(true)
  const [crimesLocationLatitude, setCrimesLocationLatitude] = useState(
    process.env.REACT_APP_HOME_LATITUDE
  )
  const [crimesLocationLongitude, setCrimesLocationLongitude] = useState(
    process.env.REACT_APP_HOME_LONGITUDE
  )

  // Subtract 2 months because latest data is typically 2 months ago
  const [selectedDate, handleDateChange] = useState()
  // moment().subtract(2, "months").calendar()
  // )

  const handleRecentDataCheckboxChange = (event) => {
    setRecentDataCheckboxState(event.target.checked)
  }

  const handleHomeCheckboxChange = (event) => {
    setHomeCheckboxState(event.target.checked)
    if (event.target.checked == true) {
      setCrimesLocationLatitude(process.env.REACT_APP_HOME_LATITUDE)
      setCrimesLocationLongitude(process.env.REACT_APP_HOME_LONGITUDE)
    } else {
      setCrimesLocationLatitude("54.695882")
      setCrimesLocationLongitude("-5.857359")
    }
  }

  const styles = {
    displayMap: {
      position: "absolute",
      height: "80vh", // 100vh
      width: "98%",
      margin: "20px",
    },
    mapContainer: {
      position: "relative",
      paddingTop: "50%",
    },
    map: {
      position: "absolute",
      width: "98%",
      height: "80vh",
      top: 0,
    },
  }

  // if (state.checkedB === true) {
  //   console.log("Home is checked")
  //   setcrimesLocationLatitude(process.env.REACT_APP_HOME_LATITUDE)
  //   setcrimesLocationLongitude(process.env.REACT_APP_HOME_LONGITUDE)
  // } else {
  //   setcrimesLocationLatitude("54.695882")
  //   setcrimesLocationLongitude("-5.857359")
  // }

  // const crimesUrl =
  //   "https://data.police.uk/api/crimes-street/all-crime?lat=52.629729&lng=-1.131592&date=2019-10"

  // build Crimes Url - use place only to fetch most recent data
  let crimesUrl =
    process.env.REACT_APP_CRIMES_ENDPOINT +
    "?lat=" +
    crimesLocationLatitude +
    "&lng=" +
    crimesLocationLongitude
  // + "&date="
  // + moment(selectedDate).format("YYYY")
  // + "-"
  // + moment(selectedDate).format("MM")

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
    <div>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          views={["year", "month"]}
          label="Choose Month and Year"
          minDate={new Date("2018-01-01")}
          maxDate={new Date("2020-07-01")}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
      <FormControlLabel
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
      <FormControlLabel
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
      <GoogleMapReact
        style={styles.displayMap}
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
        defaultCenter={props.center}
        defaultZoom={props.zoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => {
          mapRef.current = map
        }}
        onClick={(event) => {
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
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = Math.min(
                      supercluster.getClusterExpansionZoom(cluster.id),
                      20
                    )
                    mapRef.current.setZoom(expansionZoom)
                    mapRef.current.panTo({ lat: latitude, lng: longitude })
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
                <img src="/static/images/Custody.svg" alt="crime doesn't pay" />
              </button>
            </Marker>
          )
        })}
      </GoogleMapReact>
    </div>
  )
}
