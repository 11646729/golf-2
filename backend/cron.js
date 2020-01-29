import cron from "node-cron"
import { getAllVesselArrivals } from "./scrapeArrivals"
import { getSingleVesselDetails } from "./scrapeVessels"
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

  let k = 0
  do {
    let vesselDetails = []

    // Extract urls for vessels & store in newVessel array
    vesselDetails = await getSingleVesselDetails(DeduplicatedVesselUrlArray[k])

    let database_version = vesselDetails[0].database_version
    let vessel_name_url = vesselDetails[0].vessel_name_url
    let title = vesselDetails[0].title
    let vessel_type = vesselDetails[0].vessel_type
    let vessel_name = vesselDetails[0].vessel_name
    let vessel_flag = vesselDetails[0].vessel_flag
    let vessel_short_operator = vesselDetails[0].vessel_short_operator
    let vessel_long_operator = vesselDetails[0].vessel_long_operator
    let vessel_year_built = vesselDetails[0].vessel_year_built
    let vessel_length_metres = vesselDetails[0].vessel_length_metres
    let vessel_width_metres = vesselDetails[0].vessel_width_metres
    let vessel_gross_tonnage = vesselDetails[0].vessel_gross_tonnage
    let vessel_average_speed_knots = vesselDetails[0].vessel_average_speed_knots
    let vessel_max_speed_knots = vesselDetails[0].vessel_max_speed_knots
    let vessel_average_draught_metres =
      vesselDetails[0].vessel_average_draught_metres
    let vessel_imo_number = vesselDetails[0].vessel_imo_number
    let vessel_mmsi_number = vesselDetails[0].vessel_mmsi_number
    let vessel_callsign = vesselDetails[0].vessel_callsign
    let vessel_typical_passengers = vesselDetails[0].vessel_typical_passengers
    let vessel_typical_crew = vesselDetails[0].vessel_typical_crew

    const newVessel = new Vessel({
      database_version,
      vessel_name_url,
      title,
      vessel_type,
      vessel_name,
      vessel_flag,
      vessel_short_operator,
      vessel_long_operator,
      vessel_year_built,
      vessel_length_metres,
      vessel_width_metres,
      vessel_gross_tonnage,
      vessel_average_speed_knots,
      vessel_max_speed_knots,
      vessel_average_draught_metres,
      vessel_imo_number,
      vessel_mmsi_number,
      vessel_callsign,
      vessel_typical_passengers,
      vessel_typical_crew
    })

    newVessel.save()

    k++
  } while (k < DeduplicatedVesselUrlArray.length)

  console.log(DeduplicatedVesselUrlArray.length + " Vessel details added")
}
