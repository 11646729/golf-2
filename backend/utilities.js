import { getVesselDetailsHTML, getSingleVesselDetails } from "./scrapeVessels"

export async function getVesselDetails(VesselUrl) {
  // Get a Specific Vessel Details
  const htmlVesselData = await getVesselDetailsHTML(VesselUrl)
  const vesselDetails = await getSingleVesselDetails(htmlVesselData)

  // Store Vessel Detail url in vesselDetails vessel_url field
  vesselDetails[0].vessel_name_url = VesselUrl

  // Return our data array
  return vesselDetails
}
