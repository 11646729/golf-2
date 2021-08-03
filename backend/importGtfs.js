import { importGtfs } from "gtfs"
import config from "./configHamilton.js"
// import config from "./configMetro.js"
// import config from "./configDublin.js"

// Function to import GTFS data to SQLite database
export var importGtfsToSQLite = async () => {
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
    console.log("\n\nError in importGtfsToSQLite: ", error)
  }
}

// import { importGtfs } from "gtfs"
// import { readFile } from "fs/promises"
// const config = JSON.parse(
//   await readFile(new URL("./configHamilton.json", import.meta.url))
// )

// importGtfs(config)
//   .then(() => {
//     console.log("Import Successful")
//   })
//   .catch((err) => {
//     console.error(err)
//   })

// import { openDb, getRoutes } from "gtfs"
// import { readFile } from "fs/promises"
// const config = JSON.parse(
//   await readFile(new URL("./config.json", import.meta.url))
// )

// const db = await openDb(config)
// const routes = await getRoutes(
//   {},
//   ["route_id", "route_short_name", "route_color"],
//   [["route_short_name", "ASC"]]
// )
