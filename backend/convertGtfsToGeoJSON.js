import gtfsToGeoJSON from "gtfs-to-geojson"
import config from "./config.json"
import axios from "axios"

// Function to convert GTFS data to geoJSON
export const convertGtfsToGeoJSON = async () => {
  try {
    gtfsToGeoJSON(config)
      .then(() => {
        console.log("\n\nGeoJSON Generation Successful")
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (error) {
    console.log("Error in convertGtfsToGeoJSON: ", error)
  }
}

// Fetch a list of GeoJson route files
const getGeojsonFilenames = async () => {
  const filePath = "http://localhost:5000/api/gtfsTransport/filenames"
  let busRoutesResult = await axios.get(filePath)

  // console.log(busRoutesResult.data)

  return busRoutesResult.data
}
