import gtfsToGeoJSON from "gtfs-to-geojson"
import config from "./custom-config.json"

// Function to convert GTFS data to geoJSON
export const convertGtfsDataToGeojson = async () => {
  try {
    gtfsToGeoJSON(config)
      .then(() => {
        console.log("GeoJSON Generation Successful")
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (err) {
    console.log("Error in importGtfsData: ", err)
  }
}
