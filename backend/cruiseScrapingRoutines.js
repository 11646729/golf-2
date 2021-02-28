import { getAllVesselArrivals } from "./scrapeArrivals"
import { getSingleVesselDetails } from "./scrapeVessels"
import { PortArrivalSchema } from "./models/cruiseModels/v1/portArrivalSchema"
import { VesselSchema } from "./models/cruiseModels/v1/vesselSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// -------------------------------------------------------
// Fetch Port Arrivals & Vessel Details
// Path: Function called in switchBoard
// -------------------------------------------------------
export const fetchPortArrivalsAndVessels = async () => {
  // Firstly delete all existing Port Arrivals in the database
  PortArrivalSchema.deleteMany({})
    .then((res) => {
      console.log("No of old Post Arrivals deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message)
    })

  // Firstly delete all existing Vessels in the database
  VesselSchema.deleteMany({})
    .then((res) => {
      console.log("No of old Vessels deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(err.message)
    })

  let vesselUrls = await getAndSavePortArrivals()

  // Now remove duplicates and store Urls in DeduplicatedVesselUrlArray array
  const DeduplicatedVesselUrlArray = Array.from(new Set(vesselUrls))

  // Sort array ascending
  DeduplicatedVesselUrlArray.sort()

  let loop = 0
  do {
    // Extract urls for vessels & store in newVessel array
    await getSingleVesselDetails(DeduplicatedVesselUrlArray[loop])

    loop++
  } while (loop < DeduplicatedVesselUrlArray.length)

  console.log(DeduplicatedVesselUrlArray.length + " Vessels added")
}

// -------------------------------------------------------
// Fetch Port Arrivals Details
// Path: Local function called by fetchPortArrivalsAndVessels
// -------------------------------------------------------
const getAndSavePortArrivals = async () => {
  let allArrivalsVesselUrls = []

  let allArrivals = await getAllVesselArrivals()

  // Now extract vessel details urls
  let i = 0
  do {
    allArrivalsVesselUrls.push(allArrivals[i].portArrival.vesselNameUrl)

    const coords = new CoordsSchema({
      lat: allArrivals[i].portArrival.portCoordinates.lat,
      lng: allArrivals[i].portArrival.portCoordinates.lng,
    })

    const portArrival = new PortArrivalSchema({
      databaseVersion: allArrivals[i].portArrival.database_version,
      portName: allArrivals[i].portArrival.portName,
      portUnLocode: allArrivals[i].portArrival.portUnLocode,
      portCoordinates: coords,
      vesselShortCruiseName: allArrivals[i].portArrival.vesselShortCruiseName,
      vesselEta: allArrivals[i].portArrival.vesselEta,
      vesselEtd: allArrivals[i].portArrival.vesselEtd,
      vesselNameUrl: allArrivals[i].portArrival.vesselNameUrl,
    })

    // Now save in mongoDB
    portArrival.save().catch((err) => console.log("Error: " + err))

    i++
  } while (i < allArrivals.length)

  console.log(allArrivals.length + " Port Arrivals added")

  return allArrivalsVesselUrls
}
