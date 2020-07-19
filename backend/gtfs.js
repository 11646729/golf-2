import gtfs from "gtfs"
import gtfsToGeoJSON from "gtfs-to-geojson"
import mongoose from "mongoose"
import config from "./custom-config.json"

// Function to fetch GTFS data
export const importGtfsData = async () => {
  try {
    gtfs
      .import(config)
      .then(() => {
        console.log("Import Successful")
        return mongoose.connection.close()
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (err) {
    console.log("Error in importGtfsData: ", err)
  }
}

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
