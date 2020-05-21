import React from "react"
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"

export const GoogleMapContainer = () => {
  const defaultCenter = {
    lat: 54.665577,
    lng: -5.766897,
  }

  const mapStyles = {
    position: "absolute",
    height: "100vh", // 100vh
    width: "95%",
    margin: "20px",
  }

  const database = [
    {
      // databaseVersion: 1,
      // type: "FeatureCollection",
      // crsName: "WGS84",
      // crsUrn: "urn:ogc:def:crs:OGC:1.3:CRS84",
      // _id: "5ec2b04c8d40ab1400d1a012",
      // courses: [
      //   {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fb9",
      name: "Ardglass Golf Club",
      phoneNumber: "028 44 841 219",
      location: {
        _id: "5ec2b04c8d40ab1400d19fb8",
        lat: 54.258716,
        lng: -5.604549,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fbc",
      name: "Ardminnan Golf Club",
      phoneNumber: "028 4277 1321",
      location: {
        _id: "5ec2b04c8d40ab1400d19fbb",
        lat: 54.414666,
        lng: -5.469174,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fbf",
      name: "Balmoral Golf Club",
      phoneNumber: "028 9038 1514",
      location: {
        _id: "5ec2b04c8d40ab1400d19fbe",
        lat: 54.565785,
        lng: -5.968653,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fc2",
      name: "Bangor Golf Club",
      phoneNumber: "028 9127 0922",
      location: {
        _id: "5ec2b04c8d40ab1400d19fc1",
        lat: 54.659859,
        lng: -5.654729,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fc5",
      name: "Belvoir Park Golf Club",
      phoneNumber: "028 9049 1693",
      location: {
        _id: "5ec2b04c8d40ab1400d19fc4",
        lat: 54.561471,
        lng: -5.914224,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fc8",
      name: "Blackwood Golf Centre",
      phoneNumber: "028 9185 2706",
      location: {
        _id: "5ec2b04c8d40ab1400d19fc7",
        lat: 54.630849,
        lng: -5.726133,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fcb",
      name: "Carnlea Golf Club",
      phoneNumber: "028 9127 0368",
      location: {
        _id: "5ec2b04c8d40ab1400d19fca",
        lat: 54.666202,
        lng: -5.703048,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fce",
      name: "Castlereagh Hills Golf Club",
      phoneNumber: "028 9044 8477",
      location: {
        _id: "5ec2b04c8d40ab1400d19fcd",
        lat: 54.571461,
        lng: -5.831853,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fd1",
      name: "Castlerock Golf Club",
      phoneNumber: "028 7084 8314",
      location: {
        _id: "5ec2b04c8d40ab1400d19fd0",
        lat: 55.165779,
        lng: -6.784519,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fd4",
      name: "Clandeboye Golf Club",
      phoneNumber: "028 9127 1767",
      location: {
        _id: "5ec2b04c8d40ab1400d19fd3",
        lat: 54.626163,
        lng: -5.684562,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fd7",
      name: "Cliftonville Golf Club",
      phoneNumber: "028 9074 4158",
      location: {
        _id: "5ec2b04c8d40ab1400d19fd6",
        lat: 54.625353,
        lng: -5.953633,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fda",
      name: "Donaghadee Golf Club",
      phoneNumber: "028 9188 3624",
      location: {
        _id: "5ec2b04c8d40ab1400d19fd9",
        lat: 54.653172,
        lng: -5.549328,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fdd",
      name: "Dunmurry Golf Club",
      phoneNumber: "028 9062 1314",
      location: {
        _id: "5ec2b04c8d40ab1400d19fdc",
        lat: 54.545321,
        lng: -5.983643,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fe0",
      name: "Edenmore Country Club",
      phoneNumber: "028 9261 9241",
      location: {
        _id: "5ec2b04c8d40ab1400d19fdf",
        lat: 54.451971,
        lng: -6.233941,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fe3",
      name: "Galgorm Castle Golf Club",
      phoneNumber: "028 2564 6161",
      location: {
        _id: "5ec2b04c8d40ab1400d19fe2",
        lat: 54.855284,
        lng: -6.312051,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fe6",
      name: "Helen's Bay Golf Course",
      phoneNumber: "028 9185 2815",
      location: {
        _id: "5ec2b04c8d40ab1400d19fe5",
        lat: 54.668818,
        lng: -5.738059,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fe9",
      name: "Holywood Golf Club",
      phoneNumber: "028 9042 3135",
      location: {
        _id: "5ec2b04c8d40ab1400d19fe8",
        lat: 54.631174,
        lng: -5.830112,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fec",
      name: "Kirkistown Castle Golf Club",
      phoneNumber: "028 4277 1233",
      location: {
        _id: "5ec2b04c8d40ab1400d19feb",
        lat: 54.440484,
        lng: -5.472254,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19fef",
      name: "Knock Golf Club",
      phoneNumber: "028 9048 3251",
      location: {
        _id: "5ec2b04c8d40ab1400d19fee",
        lat: 54.595872,
        lng: -5.819143,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19ff2",
      name: "Mahee Island Golf Club",
      phoneNumber: "028 9754 1234",
      location: {
        _id: "5ec2b04c8d40ab1400d19ff1",
        lat: 54.498789,
        lng: -5.643564,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19ff5",
      name: "Malone Golf Club",
      phoneNumber: "028 9061 2758",
      location: {
        _id: "5ec2b04c8d40ab1400d19ff4",
        lat: 54.538048,
        lng: -5.97205,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19ff8",
      name: "Ormeau Golf Club",
      phoneNumber: "028 9064 0700",
      location: {
        _id: "5ec2b04c8d40ab1400d19ff7",
        lat: 54.579967,
        lng: -5.913676,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19ffb",
      name: "Portstewart Golf Club",
      phoneNumber: "028 7083 2015",
      location: {
        _id: "5ec2b04c8d40ab1400d19ffa",
        lat: 55.171454,
        lng: -6.724955,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d19ffe",
      name: "Rockmount Golf Club",
      phoneNumber: "028 9081 2279",
      location: {
        _id: "5ec2b04c8d40ab1400d19ffd",
        lat: 54.488131,
        lng: -5.882425,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d1a001",
      name: "Royal Portrush Golf Club",
      phoneNumber: "028 7082 2311",
      location: {
        _id: "5ec2b04c8d40ab1400d1a000",
        lat: 55.199731,
        lng: -6.635313,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d1a004",
      name: "Scrabo Golf Club",
      phoneNumber: "028 9181 2355",
      location: {
        _id: "5ec2b04c8d40ab1400d1a003",
        lat: 54.577895,
        lng: -5.719557,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d1a007",
      name: "Shandon Park Golf Club",
      phoneNumber: "028 9080 5030",
      location: {
        _id: "5ec2b04c8d40ab1400d1a006",
        lat: 54.583079,
        lng: -5.855763,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d1a00a",
      name: "Temple Golf & Country Club",
      phoneNumber: "028 9263 9213",
      location: {
        _id: "5ec2b04c8d40ab1400d1a009",
        lat: 54.465682,
        lng: -5.906807,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d1a00d",
      name: "The Royal Belfast Golf Club",
      phoneNumber: "028 9042 8165",
      location: {
        _id: "5ec2b04c8d40ab1400d1a00c",
        lat: 54.661631,
        lng: -5.783817,
      },
    },
    {
      type: "Feature",
      _id: "5ec2b04c8d40ab1400d1a010",
      name: "The Royal County Down Golf Club",
      phoneNumber: "028 4372 3314",
      location: {
        _id: "5ec2b04c8d40ab1400d1a00f",
        lat: 54.21792,
        lng: -5.883267,
      },
    },
    // ],
    //   createdAt: "2020-05-18T15:57:00.094Z",
    //   updatedAt: "2020-05-18T15:57:00.094Z",
    //   __v: 0,
    // },
  ]

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
  })

  const options = {
    mapTypeId: "hybrid",
    zoomControlOptions: {
      // ...otherOptions
    },
  }

  // Listen for data and update the state
  // useEffect(() => {
  //   setData((data) => [...data, database])
  // }, [])

  const renderMap = () => (
    <div>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={defaultCenter}
        options={options}
      >
        {database.map((item) => {
          return <Marker key={item.name} position={item.location} />
        })}
      </GoogleMap>
    </div>
  )

  return isLoaded ? renderMap() : null
}

export default GoogleMapContainer
