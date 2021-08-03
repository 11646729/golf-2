import { importGtfs } from "gtfs"
import config from "./configHamilton.js"
// import config from "./configMetro.js"
// import config from "./configDublin.js"

// Function to import GTFS data to SQLite database
export var importGtfsToSQLite = async () => {
  try {
    importGtfs(config)
      .then(() => {
        console.log("Import Successful")
      })
      .catch((err) => {
        console.error(err)
      })
  } catch (error) {
    console.log("\n\nError in importGtfsToSQLite: ", error)
  }
}
