import cron from "node-cron"
import db from "./db"
import { getAllVesselArrivals } from "./scrapeArrivals"
import { getVesselDetails } from "./scrapeVessels"

cron.schedule("* * * * *", () => {
  console.log("Started Scraping!")
  emptyFile()
  runCron()
  console.log("Scraping done at " + Date.now())
})

export async function emptyFile() {
  //  First delete previous data
  db.get("arrivalScrapes")
    .remove()
    .write()

  db.get("vesselScrapes")
    .remove()
    .write()
}

export async function runCron() {
  let allArrivals = await getAllVesselArrivals()

  db.get("arrivalScrapes")
    .push({
      // date: Date.now(),
      // arrivals: allArrivals
      allArrivals
    })
    .write()

  console.log("Vessel arrivals added")

  let vesselUrls = []

  // Now extract vessel details urls
  let i = 0
  do {
    // Extract urls for vessels & store in newVessel array
    vesselUrls.push(allArrivals[i].vessel_name_url)
    i++
  } while (i < allArrivals.length)

  // Now remove duplicates and store Urls in DeduplicatedVesselUrlArray array
  const DeduplicatedVesselUrlArray = Array.from(new Set(vesselUrls))

  // Sort array ascending
  DeduplicatedVesselUrlArray.sort()

  let vesselDetails = []

  let j = 0
  do {
    // Extract urls for vessels & store in newVessel array
    vesselDetails.push(await getVesselDetails(DeduplicatedVesselUrlArray[j]))
    j++
  } while (j < DeduplicatedVesselUrlArray.length)

  db.get("vesselScrapes")
    .push({
      // date: Date.now(),
      // vessels: vesselDetails
      vesselDetails
    })
    .write()

  console.log("Vessel details added")
}
