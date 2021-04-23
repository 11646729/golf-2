import gtfs from "gtfs"
import config from "./configHamilton.json"
// import config from "./configMetro.json"
// import config from "./configDublin.json"

// Function to import GTFS data to SQLite database
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
    console.log("\n\nError in convertGtfsToGeoJSON: ", error)
  }
}
