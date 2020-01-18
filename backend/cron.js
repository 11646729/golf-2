import cron from "node-cron"
import db from "./db"
import { getAllVesselArrivals } from "./scrapeArrivals"

cron.schedule("* * * * *", () => {
  console.log("running a task every minute")

  runCron()
})

export async function runCron() {
  console.log("Started Scraping!")

  const allArrivals = await getAllVesselArrivals()

  db.get("arrivals")
    .push({
      date: Date.now(),
      allArrivals
    })
    .write()

  console.log("Scraping done at " + Date.now())
}
