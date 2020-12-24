import axios from "axios"
import { getSingleBusRoute } from "./getSingleBusRoute"

// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
export const createReducedRoutes = async () => {
  console.log("Fetching list of geojson filenames in a directory")

  const filePath = "http://localhost:5000/api/gtfsTransport/filenames"
  const busRoutesResult = await axios.get(filePath)

  let i = 0
  // do {

  let singleRoute = busRoutesResult.data[i]
  getSingleBusRoute(singleRoute)
  console.log(singleRoute)

  //   i++
  // } while (i < busRoutesResult.data.length)
}
