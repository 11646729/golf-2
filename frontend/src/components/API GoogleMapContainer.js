import React, { useState, useEffect } from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"
import fileDatabase from "./testNearbyGolfCourseData.json"

export const GoogleMapContainer = () => {
  const [markers, setData] = useState("")

  // Listen for data and update the state
  useEffect(() => {
    setData((markers) => [...markers, fileDatabase.courses])
  }, [])

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  if (loadError) return "Error loading Map"
  if (!isLoaded) return "Loading Map..."

  const mapStyles = {
    position: "absolute",
    height: "86vh", // 100vh
    width: "98%",
    margin: "20px",
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

  // const database = {
  //   databaseVersion: 1,
  //   type: "FeatureCollection",
  //   crsName: "WGS84",
  //   crsUrn: "urn:ogc:def:crs:OGC:1.3:CRS84",
  //   _id: "5ec2b04c8d40ab1400d1a012",
  //   courses: [
  //     {
  //       type: "Feature",
  //       _id: "5ec2b04c8d40ab1400d19fb9",
  //       name: "Ardglass Golf Club",
  //       phoneNumber: "028 44 841 219",
  //       location: {
  //         _id: "5ec2b04c8d40ab1400d19fb8",
  //         lat: 54.258716,
  //         lng: -5.604549,
  //       },

  const renderMap = () => (
    <div>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={14}
        center={defaultCenter}
        options={options}
      >
        {markers[0].map((item) => {
          return <Marker key={item.name} position={item.location} />
        })}
      </GoogleMap>
    </div>
  )

  return isLoaded ? renderMap() : null
}

export default GoogleMapContainer
