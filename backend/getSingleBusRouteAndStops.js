import axios from "axios"
import { reduceSaveBusRouteAndStops } from "./reduceSaveBusRouteAndStops"

// This routine is called from the individual route button
// -------------------------------------------------------

// Function to fetch data from a single GeoJson route file
export const getSingleBusRouteAndStops = async (singleRoute) => {
  let res = await axios({
    url: "http://localhost:5000/api/gtfsTransport/gtfsRoutes/:id",
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
    // console.log("Fetched data from a single geojson file")
    // Now pass data from a single GeoJson route filename to reduceSaveBusRouteAndStops function
    reduceSaveBusRouteAndStops(res.data, singleRoute)
  } else {
    console.log("Error fetching data from a single geojson file")
  }
}
