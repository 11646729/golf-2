import cron from "node-cron"
import mongoose from "mongoose"
import { getAllVesselArrivals } from "./scrapeArrivals"
import { getVesselDetails } from "./scrapeVessels"
import { PortArrival } from "./models/cruiseShippingModels/v1/portArrival"
import { Vessel } from "./models/cruiseShippingModels/v1/vessel"

cron.schedule("* * * * *", () => {
  console.log("Started Scraping!")
  emptyFile()
  //  getPortArrivals()
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

export async function getAndSavePortArrivals() {
  let allArrivalsVesselUrls = []

  let allArrivals = await getAllVesselArrivals()

  // Now extract vessel details urls
  let i = 0
  do {
    let database_version = allArrivals[i].database_version
    let port_name = allArrivals[i].port_name
    let port_un_locode = allArrivals[i].port_un_locode
    let port_longitude = allArrivals[i].port_longitude
    let port_latitude = allArrivals[i].port_latitude
    let vessel_shortcruise_name = allArrivals[i].vessel_shortcruise_name
    let vessel_eta = allArrivals[i].vessel_eta
    let vessel_etd = allArrivals[i].vessel_etd
    let vessel_name_url = allArrivals[i].vessel_name_url

    allArrivalsVesselUrls.push(vessel_name_url)

    // Now save in mongoDB
    const newPortArrival = new PortArrival({
      database_version,
      port_name,
      port_un_locode,
      port_longitude,
      port_latitude,
      vessel_shortcruise_name,
      vessel_eta,
      vessel_etd,
      vessel_name_url
    })

    newPortArrival.save()
    i++
  } while (i < allArrivals.length)

  console.log(allArrivals.length + " Vessel arrivals added")

  return allArrivalsVesselUrls
}

export async function runCron() {
  let vesselUrls = await getAndSavePortArrivals()

  // Now remove duplicates and store Urls in DeduplicatedVesselUrlArray array
  const DeduplicatedVesselUrlArray = Array.from(new Set(vesselUrls))

  // Sort array ascending
  DeduplicatedVesselUrlArray.sort()

  let vesselDetails = []

  let k = 0
  do {
    // Extract urls for vessels & store in newVessel array
    vesselDetails.push(await getVesselDetails(DeduplicatedVesselUrlArray[k]))
    k++
  } while (k < DeduplicatedVesselUrlArray.length)

  console.log(DeduplicatedVesselUrlArray.length + " Vessel details added")
}
