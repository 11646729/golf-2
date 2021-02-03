import gtfsToGeoJSON from "gtfs-to-geojson"
import config from "./config.json"
// import config from "./configMetro.json"
import { createReducedRoutesAndStops } from "./createReducedRoutesAndStops"

// Function to convert GTFS data to GeoJson
export const convertGtfsToGeoJSON = async () => {
  try {
    gtfsToGeoJSON(config)
      .then(() => {
        console.log("\n\nGeoJSON Generation Successful")
        createReducedRoutesAndStops()
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (error) {
    console.log("\n\nError in convertGtfsToGeoJSON: ", error)
  }
}
