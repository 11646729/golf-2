import { getVesselArrivals, getScheduleMonths } from "./scrapeArrivals"
import { getVesselDetailsHTML, getSingleVesselDetails } from "./scrapeVessels"
import dotenv from "dotenv"
import moment from "moment"

dotenv.config()

let allVesselMovements = []

export async function getAllVesselArrivalsAndVesselDetails() {
  const scheduledPeriod = await getScheduleMonths()

  let i = 0

  do {
    const period = String(scheduledPeriod[i].monthYearString)
    let vesselArrivals = await getVesselArrivals(period)

    let j = 0

    do {
      allVesselMovements.push(vesselArrivals[j])

      j++
    } while (j < vesselArrivals.length)

    i++
  } while (i < scheduledPeriod.length)

  console.log(allVesselMovements)

  // Now fetch the vessel details for the arrivals
  // TODO - Check if vessel already exists & hasn't been updated first
  // -----------------------------------------------------------------
  // let vessel_url = ""
  // let vesselDetails = ""

  // //   for (let i = 0; i < vesselArrivals.length; i++) {
  // vessel_url = vesselArrivals[i].vessel_name_url
  // //    vesselDetails = await getVesselDetails(vessel_url)
  // console.log(i)
  // console.log(vessel_url)
  //    console.log(vesselDetails)
  //   }
  // }

  //    console.log(allVesselMovements.length)
}

// async function getVesselDetails(VesselUrl) {
//   // Get a Specific Vessel Details
//   const htmlVesselData = await getVesselDetailsHTML(VesselUrl)
//   const vesselDetails = await getSingleVesselDetails(htmlVesselData)

//   // Store Vessel Detail url in vesselDetails vessel_url field
//   vesselDetails[0].vessel_name_url = VesselUrl

//   // Return our data array
//   return vesselDetails
// }
