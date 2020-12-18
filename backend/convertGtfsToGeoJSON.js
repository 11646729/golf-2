import gtfsToGeoJSON from "gtfs-to-geojson"
import config from "./config.json"
import { reduceGeoJsonFiles } from "./reduceGeoJsonFiles"

// Function to convert GTFS data to GeoJson
export const convertGtfsToGeoJSON = async () => {
  try {
    gtfsToGeoJSON(config)
      .then(() => {
        console.log("\n\nGeoJSON Generation Successful")
        reduceGeoJsonFiles()
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (error) {
    console.log("\n\nError in convertGtfsToGeoJSON: ", error)
  }
}
