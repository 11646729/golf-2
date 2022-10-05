import React, { useState, useRef, memo } from "react"
import PropTypes from "prop-types"
// import GoogleMapReact from "google-map-react"
// import useSupercluster from "use-supercluster"
import moment from "moment"
// import MomentUtils from "@date-io/moment"
import // Container,
// Grid,
// styled,
"@material-ui/core"
// import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers"
import styled from "styled-components"

import Title from "./Title"

const NearbyCrimesMapContainer = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px;
  padding-top: 30px;
`

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
  const { crimesData, nearbyCrimesMapTitle } = props

  NearbyCrimesMap.propTypes = {
    crimesData: PropTypes.array,
    nearbyCrimesMapTitle: PropTypes.string,
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

  const [selectedDate, setDateChange] = useState("")

  // // Event Handlers
  // const handleHomeCheckboxChange = (event) => {
  //   // setHomeCheckbox(event.target.checked)
  //   setZoom(parseFloat(process.env.REACT_APP_CRIMES_DEFAULT_ZOOM))

  //   if (event.target.checked === true) {
  //     setMapCenter({
  //       lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE),
  //       lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE),
  //     })
  //   } else {
  //     setMapCenter({
  //       lat: parseFloat(process.env.REACT_APP_ANDREA_HOME_LATITUDE),
  //       lng: parseFloat(process.env.REACT_APP_ANDREA_HOME_LONGITUDE),
  //     })
  //   }
  // }

  // const markerClicked = (marker) => {
  //   console.log("clicked...")
  //   console.log("The marker that was clicked is", marker)
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

  // return isLoaded ? (
  return (
    <NearbyCrimesMapContainer>
      <Title>{nearbyCrimesMapTitle}</Title>
      {/* <div> */}
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
    </NearbyCrimesMapContainer>
  )
  // ) : null
}

export default memo(NearbyCrimesMap)
