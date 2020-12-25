import axios from "axios"
import { reduceSaveBusRoute } from "./reduceSaveBusRoute"

// This routine is called from the individual route button
// -------------------------------------------------------

// Function to fetch data from a single GeoJson file
export const getSingleBusRoute = async (singleRoute) => {
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
    console.log("Fetched data from a single geojson file")

    let index = singleRoute.substring(0, singleRoute.indexOf("."))

    reduceSaveBusRoute(res.data, index)
  } else {
    console.log("Error fetching data from a single geojson file")
  }
}
