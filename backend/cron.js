import cron from "node-cron"
import db from "./db"
import { getAllVesselArrivals } from "./scrapeArrivals"

cron.schedule("* * * * *", () => {
  console.log("Started Scraping!")
  emptyFile()
  runCron()
  console.log("Scraping done at " + Date.now())
})

export async function emptyFile() {
  //  First delete previous data
  db.get("arrivals")
    .remove()
    .write()
}

export async function runCron() {
  // Now add new data
  let allArrivals = []

  allArrivals = await getAllVesselArrivals()

  db.get("arrivals")
    .push({
      date: Date.now(),
      arrivals: allArrivals
    })
    .write()
}
