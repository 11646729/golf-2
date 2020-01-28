import cron from "node-cron"
import db from "./db"
import mongoose from "mongoose"
import { getAllVesselArrivals } from "./scrapeArrivals"
import { getVesselDetails } from "./scrapeVessels"
import { PortArrival } from "./models/cruiseShippingModels/v1/portArrival"
import { Vessel } from "./models/cruiseShippingModels/v1/vessel"

cron.schedule("* * * * *", () => {
  console.log("Started Scraping!")
  emptyFile()
  runCron()
  console.log("Scraping done at " + Date.now())
})

export async function emptyFile() {
  // First delete all previous data
  PortArrival.deleteMany({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("PortArrival collection emptied")
    }
  })

  Vessel.deleteMany({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("Vessel collection emptied")
    }
  })
}

export async function runCron() {
  let allArrivals = await getAllVesselArrivals()

  // TODO - Move mongoDB save to here

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

  console.log("Vessel details added")
}
