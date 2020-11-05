import gtfsToGeoJSON from "gtfs-to-geojson"
import config from "./config.json"

// Function to convert GTFS data to geoJSON
export const convertGtfsToGeoJSON = async () => {
  try {
    gtfsToGeoJSON(config)
      .then(() => {
        console.log("GeoJSON Generation Successful")
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (error) {
    console.log("Error in convertGtfsToGeoJSON: ", error)
  }
}
