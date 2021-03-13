import gtfsToGeoJSON from "gtfs-to-geojson"
// import config from "./config.json"
// import config from "./configMetro.json"
import config from "./configDublin.json"
import { createGtfsRoutesAndGtfsStops } from "./createGtfsRoutesAndGtfsStops"

// Function to convert GTFS data to GeoJson
export const convertGtfsToGeoJSON = async () => {
  try {
    gtfsToGeoJSON(config)
      .then(() => {
        console.log("\n\nGeoJSON Generation Successful")
        // createGtfsRoutesAndGtfsStops()
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (error) {
    console.log("\n\nError in convertGtfsToGeoJSON: ", error)
  }
}
