import gtfs from "gtfs"
import config from "./config.json"

// Function to fetch GTFS data to SQLite database
export const importGtfsToSQLite = async () => {
  try {
    gtfs
      .import(config)
      .then(() => {
        console.log("Import Successful")
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (error) {
    console.log("Error in importGtfsToSQLite: ", error)
  }
}
