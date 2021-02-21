const fs = require("fs")
import { reduceSaveBusRouteAndStops } from "./reduceSaveBusRouteAndStops"

// This routine is called from the individual route button
// -------------------------------------------------------

// Function to fetch data from a single GeoJson route file
export const getSingleBusRouteAndStops = async (singleRoute) => {
  const rawGeojson = process.env.GEOJSON_FILES_PATH + singleRoute

  fs.readFile(rawGeojson, "utf8", (err, data) => {
    if (err) {
      //   console.log("Error fetching data from a single geojson file")
      throw err
    }

    // Now pass data from a single GeoJson route filename to reduceSaveBusRouteAndStops function
    reduceSaveBusRouteAndStops(JSON.parse(data), singleRoute)
  })
}
