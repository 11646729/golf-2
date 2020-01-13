import { getVesselArrivals, getScheduleMonths } from "./scrapeArrivals"
import { getVesselDetailsHTML, getSingleVesselDetails } from "./scrapeVessels"
import dotenv from "dotenv"
import moment from "moment"

dotenv.config()

export async function getAllVesselArrivalsAndVesselDetails() {
  const scheduledPeriod = await getScheduleMonths()

  let i = 0

  do {
    const period = scheduledPeriod[i].monthYearString
    const vesselArrivals = await getVesselArrivals(period)

    console.log(period)
    console.log(vesselArrivals)

    i++
  } while (i < scheduledPeriod.length)
}

//   // Now fetch the vessel details for the arrivals
//   // TODO - Check if vessel already exists & hasn't been updated first
//   // -----------------------------------------------------------------
//   let vessel_url = ""
//   let vesselDetails = ""

//   for (let i = 0; i < vesselArrivals.length; i++) {
//     vessel_url = vesselArrivals[i].vessel_name_url

//     vesselDetails = await getVesselDetails(vessel_url)
//     //    console.log(vesselDetails)
//   }
// }

// async function getVesselDetails(VesselUrl) {
//   // Get a Specific Vessel Details
//   const htmlVesselData = await getVesselDetailsHTML(VesselUrl)
//   const vesselDetails = await getSingleVesselDetails(htmlVesselData)

//   // Store Vessel Detail url in vesselDetails vessel_url field
//   vesselDetails[0].vessel_name_url = VesselUrl

//   // Return our data array
//   return vesselDetails
// }
