import axios from "axios"

// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
export const reduceGeoJsonFiles = async () => {
  console.log("Fetching list of filenames")

  const filePath = "http://localhost:5000/api/gtfsTransport/filenames"
  const busRoutesResult = await axios.get(filePath)

  selectFirstGeojsonFile(busRoutesResult.data)
}

// Function to select GeoJson file types
const selectFirstGeojsonFile = async (busRoutesResult) => {
  // console.log("Selecting only GeoJson file types")

  let i = 0
  // do {
  //   if (
  //     busRoutesResult[i].substring(
  //       busRoutesResult[i].length - 7,
  //       busRoutesResult[i].length
  //     ) == "geojson"
  //   ) {
  let singleRoute = busRoutesResult[i]
  getSingleBusRoute(singleRoute)
  //     }
  //     i++
  //   } while (i < busRoutesResult.length)
}

// Function to fetch data from a single GeoJson file
const getSingleBusRoute = async (singleRoute) => {
  // console.log("Fetching a single file")

  let res = await axios({
    url: "http://localhost:5000/api/gtfsTransport/routes/:id",
    params: {
      id: singleRoute,
    },
    method: "get",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })
  // Test for Status - 200 is a Success response code
  if (res.status === 200) {
    console.log("Fetched data from file")

    let index = singleRoute.substring(0, singleRoute.indexOf("."))

    reformatBusRoute(res.data, index)
  }
}

// Function to extract data for reduced dataset
const reformatBusRoute = async (busRoute, index) => {
  console.log("Extract data for reduced dataset")

  let loop = 0
  do {
    if (busRoute.features[loop].geometry.type === "LineString") {
      console.log("LineString")

      // let info = {
      let markerType = busRoute.features[loop].geometry.type
      let routeKey = index
      let routeColor = busRoute.features[loop].properties.route_color
      let routeLongName = busRoute.features[loop].properties.route_long_name
      let routeShortName = busRoute.features[loop].properties.route_short_name

      // Change order of coordinates
      let i = 0
      let tempGoogleMapsCoords = []
      let tempCoords = []
      do {
        tempCoords = [
          busRoute.features[loop].geometry.coordinates[i][1],
          busRoute.features[loop].geometry.coordinates[i][0],
        ]
        tempGoogleMapsCoords.push(tempCoords)

        tempCoords = []
        i++
      } while (i < busRoute.features[loop].geometry.coordinates.length)

      let googleMapsCoords = tempGoogleMapsCoords

      console.log(googleMapsCoords)
      // }
    }

    if (busRoute.features[loop].geometry.type === "Point") {
      console.log("Point")

      // let info = {
      let markerType = busRoute.features[loop].geometry.type
      let routeKey = index
      let stopName = busRoute.features[loop].properties.stop_name
      let stopCoords = busRoute.features[loop].geometry.coordinates
      let googleMapsCoords = [
        busRoute.features[loop].geometry.coordinates[1],
        busRoute.features[loop].geometry.coordinates[0],
      ]
      // }
      console.log(googleMapsCoords)
    }

    loop++
  } while (loop < busRoute.features.length)

  console.log("Index is: " + index)
}
