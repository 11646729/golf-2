import { getVesselArrivalsHTML, getArrivalsSchedule } from "./scrapeArrivals"
import { getVesselDetailsHTML, getSingleVesselDetails } from "./scrapeVessels"
import dotenv from "dotenv"

dotenv.config()

let startYear = parseInt(process.env.START_YEAR)
let startMonth = parseInt(process.env.START_MONTH)
let endYear = parseInt(process.env.END_YEAR)
let endMonth = parseInt(process.env.END_MONTH)
let day = parseInt("1")

// var d = new Date()
// d.setFullYear(startYear, startMonth)

// var startOfMonth = new Date(startYear, startMonth, day)

// startOfMonth.setMonth(0)
// console.log(d)

let loopStart = process.env.START_MONTH + process.env.START_YEAR
let loopEnd = process.env.END_MONTH + process.env.END_YEAR
console.log(loopStart) // 42019
console.log(loopEnd) // 52020

// TODO - Increment Month & Year

export async function getVesselArrivalsAndVesselDetails() {
  let selectedMonth = "4"
  let selectedYear = "2019"

  const vesselArrivals = await getVesselArrival(selectedMonth, selectedYear)
  console.log(vesselArrivals)

  // Now fetch the vessel details for the arrivals
  // TODO - Check if vessel already exists & hasn't been updated first
  // -----------------------------------------------------------------
  let vessel_url = ""
  let vesselDetails = ""

  for (let i = 0; i < vesselArrivals.length; i++) {
    vessel_url = vesselArrivals[i].vessel_name_url

    vesselDetails = await getVesselDetails(vessel_url)
    //    console.log(vesselDetails)
  }
}

export async function getVesselArrival(Month, Year) {
  // Get Vessel Arrivals in a Specific Month
  const htmlData = await getVesselArrivalsHTML(Month, Year)
  const vesselArrivals = await getArrivalsSchedule(htmlData)

  // Return our data array
  return vesselArrivals
}

export async function getVesselDetails(VesselUrl) {
  // Get a Specific Vessel Details
  const htmlVesselData = await getVesselDetailsHTML(VesselUrl)
  const vesselDetails = await getSingleVesselDetails(htmlVesselData)

  // Store Vessel Detail url in vesselDetails vessel_url field
  vesselDetails[0].vessel_name_url = VesselUrl

  // Return our data array
  return vesselDetails
}
