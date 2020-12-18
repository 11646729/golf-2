import axios from "axios"

// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
export const reduceGeoJsonFiles = async () => {
  console.log("Fetching list of filenames")

  const filePath = "http://localhost:5000/api/gtfsTransport/filenames"
  const busRoutesResult = await axios.get(filePath)

  selectFirstGeojsonFile(busRoutesResult.data)
}

// Function to select 1st GeoJson filename
const selectFirstGeojsonFile = async (busRoutesResult) => {
  console.log("Selecting first filename")

  let singleRoute = busRoutesResult[0]
  getSingleBusRoute(singleRoute)

  // console.log(busRoutesResult)
  // console.log(busRoutesResult.length)
  // console.log(busRoutesResult[0]) // returns "01_0.geojson"
}

// Function to fetch data from a single file
const getSingleBusRoute = async (singleRoute) => {
  // NB singleRoute NOT USED
  // -----------------------

  console.log("Fetching first file")

  let res = await axios({
    url: "http://localhost:5000/api/gtfsTransport/routes/:id",
    method: "get",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })
  // Test for Status - 200 is a Success response code
  if (res.status === 200) {
    console.log(res.data.features)
  }
}
