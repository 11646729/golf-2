import axios from "axios"
import { getSingleBusRoute } from "./getSingleBusRoute"
import { deleteAllReducedRoutes } from "./controllers/transportControllers/v1/gtfsTransportController"

// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
export const createReducedRoutes = async () => {
  console.log("First delete old Reduced Route data in the database")
  deleteAllReducedRoutes()

  console.log("Fetching list of geojson filenames in a directory")

  let res = await axios({
    url: "http://localhost:5000/api/gtfsTransport/filenames",
    method: "get",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Test for Status - 200 is a Success response code
  if (res.status === 200) {
    console.log("Fetched list of geojson filenames")

    let i = 0
    do {
      let singleRouteFilename = res.data[i]

      // Next line is for testing only
      getSingleBusRoute(singleRouteFilename)

      // console.log("Filename is: " + singleRouteFilename)

      i++
    } while (i < res.data.length)
  } else {
    console.log("Error fetching list of geojson filenames")
  }
}
