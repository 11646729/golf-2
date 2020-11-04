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

// These 2 lines may be needed in config.json to use npm package gfts
// "url": "http://transitfeeds.com/p/hamilton-street-railway/31/latest/download"
// "path": "/Users/briansmith/Documents/GTD/golf-2/backend/gtfs data/Hamilton Ontario Street Railway",
