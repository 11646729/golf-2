import axios from "axios"
import { reduceSaveBusRoute } from "./reduceSaveBusRoute"

// Function to fetch data from a single GeoJson file
export const getSingleBusRoute = async (singleRoute) => {
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

    reduceSaveBusRoute(res.data, index)
  }
}
