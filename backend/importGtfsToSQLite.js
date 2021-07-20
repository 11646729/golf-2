import gtfs from "gtfs"
import config from "./configHamilton.json"
// import config from "./configMetro.json"
// import config from "./configDublin.json"

// Function to import GTFS data to SQLite database
export var importGtfsToSQLite = async () => {
  try {
    gtfs
      .import(config)
      .then(() => {
        console.log("Import Successful")
      })
      .then(() => {})
      .catch((err) => {
        console.error(err)
      })
  } catch (error) {
    console.log("\n\nError in importGtfsToSQLite: ", error)
  }
}
