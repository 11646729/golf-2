import React, { useState, useRef } from "react"
import useSwr from "swr"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import useSupercluster from "use-supercluster"
import "../App.css"

const fetcher = (...args) => fetch(...args).then((response) => response.json())

export default function CrimesMapContainer() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  const mapRef = useRef()
  const [bounds, setBounds] = useState(null)
  const [zoom, setZoom] = useState(10)

  // build Crimes Url
  let crimesUrl =
    process.env.REACT_APP_CRIMES_ENDPOINT +
    "?lat=" +
    process.env.REACT_APP_HOME_LATITUDE +
    "&lng=" +
    process.env.REACT_APP_HOME_LONGITUDE +
    "&date=2019-10"

  // fetch data
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

  const styles = {
    displayMap: {
      position: "absolute",
      height: "86vh", // 100vh
      width: "98%",
      margin: "20px",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9,
      marginTop: "30",
    },
  }

  const defaultCenter = {
    lat: parseFloat(process.env.REACT_APP_HOME_LATITUDE), // 54.665577
    lng: parseFloat(process.env.REACT_APP_HOME_LONGITUDE), // -5.766897
  }

  const options = {
    mapTypeId: "hybrid",
    disableDefaultUI: true,
    zoomControl: true,
  }

  const renderMap = () => {
    return (
      <div>
        <GoogleMap
          mapContainerStyle={styles.displayMap}
          zoom={14}
          center={defaultCenter}
          // options={options}
          // yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map }) => {
          //   mapRef.current = map
          // }}
          // onChange={({ zoom, bounds }) => {
          //   setZoom(zoom)
          //   setBounds([
          //     bounds.nw.lng,
          //     bounds.se.lat,
          //     bounds.se.lng,
          //     bounds.nw.lat,
          //   ])
          // }}
        >
          {/* {clusters.map((cluster) => {
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
            } */}
          {/* return ( */}
          {points.map((point) => (
            <Marker
              // key={`crime-${cluster.properties.crimeId}`}
              key={point.properties.crimeId}
              lat={point.geometry.coordinates.latitude}
              lng={point.geometry.coordinates.longitude}
            >
              {/* <button className="crime-marker">
                <img src="/custody.svg" alt="crime doesn't pay" />
              </button> */}
            </Marker>
          ))}
          {/* })} */}
        </GoogleMap>
      </div>
    )
  }

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : null
}
