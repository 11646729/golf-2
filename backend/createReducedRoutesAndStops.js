import axios from "axios"
import { getSingleBusRouteAndStops } from "./getSingleBusRouteAndStops"

// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
export const createReducedRoutesAndStops = async (req, res) => {
  console.log("Step 2: Fetch all the GeoJson route filenames in a directory")

  res = await axios({
    url: "http://localhost:5000/api/gtfsTransport/filenames",
    method: "get",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  // Test for Status - 200 is a Success response code
  if (res.status === 200) {
    console.log(
      "Html Status " + res.status + ": Fetched list of geojson filenames"
    )

    let i = 0
    // do {
    let singleRouteFilename = res.data[i]

    // Next line is for testing only
    getSingleBusRouteAndStops(singleRouteFilename)

    // console.log("Filename is: " + singleRouteFilename)

    i++
    //   } while (i < res.data.length)
    // } else {
    //   console.log("Error fetching list of geojson filenames")
    // }
  }
}
