import axios from "axios"
import { GtfsStopSchema } from "./models/transportModels/v1/gtfsStopSchema"
import { GtfsRouteSchema } from "./models/transportModels/v1/gtfsRouteSchema"
import { getSingleBusRouteAndStops } from "./getSingleBusRouteAndStops"

// Function to fetch all the GeoJson route filenames in a directory irrespective of trip direction
export const createGtfsRoutesAndGtfsStops = async (req, res) => {
  // Firstly delete all existing Routes in the database
  GtfsRouteSchema.deleteMany({})
    .then((res) => {
      console.log("No of Routes successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message || "An error occurred while removing all Routes")
    })

  // Firstly delete all existing Stops in the database
  GtfsStopSchema.deleteMany({})
    .then((res) => {
      console.log("No of Stops successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message || "An error occurred while removing all Stops")
    })

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

    // Now pass each GeoJson route filename to getSingleBusRouteAndStops function one at a time
    let i = 0
    do {
      let singleRouteFilename = res.data[i]

      getSingleBusRouteAndStops(singleRouteFilename)

      i++
    } while (i < res.data.length)
    console.log(
      "Html Status " +
        res.status +
        ": Created mongodb documents from geojson files"
    )
  } else {
    console.log("Error fetching list of geojson filenames")
  }
}
