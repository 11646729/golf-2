import { getSingleArrivalsSchedule } from "./scrapeArrivals"
import { getSingleVesselDetails } from "./scrapeVessels"

export async function getMonthAndVesselArrivals() {
  const vesselArrivals = await getSingleArrivalsSchedule()
  console.log(vesselArrivals)

  // Now fetch the vessel details for the arrivals
  // TODO - Check if vessel already exists & hasn't been updated first
  // -----------------------------------------------------------------
  let vessel_url
  let vesselDetails

  for (let i = 0; i < vesselArrivals.length; i++) {
    vessel_url = vesselArrivals[i].vessel_name_url

    vesselDetails = await getSingleVesselDetails(vessel_url)
    //    console.log(vesselDetails)
  }
}
