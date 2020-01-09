import { getVesselArrivals } from "./scrapeArrivals"
import { getVesselDetailsHTML, getSingleVesselDetails } from "./scrapeVessels"
import dotenv from "dotenv"
import moment from "moment"

dotenv.config()

export async function getAllVesselArrivalsAndVesselDetails() {
  // Fetch vessel arrivals first so calculate all URLs then loop through the URLs

  let day = parseInt("1")

  let sd = day + "/" + process.env.START_MONTH + "/" + process.env.START_YEAR
  let startDate = moment(sd, "DD-MM-YYYY").toISOString(true)

  let ed = day + "/" + process.env.END_MONTH + "/" + process.env.END_YEAR
  let endDate = moment(ed, "DD-MM-YYYY").toISOString(true)

  const NoOfMonths = moment(endDate).diff(
    moment(startDate).subtract(1, "month"),
    "months",
    true
  )

  let i = 0
  do {
    let newDate = moment(startDate).add(i, "month")

    let selectedMonth = newDate.format("MM")
    let selectedYear = newDate.format("YYYY")

    const vesselArrivals = await getVesselArrivals(selectedMonth, selectedYear)

    console.log(vesselArrivals)

    i++
  } while (i < NoOfMonths)
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
