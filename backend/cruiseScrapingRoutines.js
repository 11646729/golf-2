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
  // PortArrivalSchema.deleteMany({}).then((res) => {
  //   console.log("No of old Vessels deleted: ", res.deletedCount)
  //   // .catch((err) => {
  //   //   console.log(err.message)
  //   // })
  // })

  let vesselUrls = await getAndSavePortArrivals()

  // Now remove duplicates and store Urls in DeduplicatedVesselUrlArray array
  const DeduplicatedVesselUrlArray = Array.from(new Set(vesselUrls))

  // Sort array ascending
  DeduplicatedVesselUrlArray.sort()

  let k = 0
  do {
    let vessels = []

    // Extract urls for vessels & store in newVessel array
    vessel = await getSingleVesselDetails(DeduplicatedVesselUrlArray[k])

    const newVessel = new VesselSchema({
      databaseVersion: vessel[0].database_version,
      vesselNameUrl: vessel[0].vessel_name_url,
      title: vessel[0].title,
      vesselType: vessel[0].vessel_type,
      vesselName: vessel[0].vessel_name,
      vesselFlag: vessel[0].vessel_flag,
      vesselShortOperator: vessel[0].vessel_short_operator,
      vesselLongOperator: vessel[0].vessel_long_operator,
      vesselYearBuilt: vessel[0].vessel_year_built,
      vesselLengthMetres: vessel[0].vessel_length_metres,
      vesselWidthMetres: vessel[0].vessel_width_metres,
      vesselGrossTonnage: vessel[0].vessel_gross_tonnage,
      vesselAverageSpeedKnots: vessel[0].vessel_average_speed_knots,
      vesselMaxSpeedKnots: vessel[0].vessel_max_speed_knots,
      vesselAverageDraughtMetres: vessel[0].vessel_average_draught_metres,
      vesselImoNumber: vessel[0].vessel_imo_number,
      vesselMmsiNumber: vessel[0].vessel_mmsi_number,
      vesselCallsign: vessel[0].vessel_callsign,
      vesselTypicalPassengers: vessel[0].vessel_typical_passengers,
      vesselTypicalCrew: vessel[0].vessel_typical_crew,
    })

    // Now save in mongoDB
    newVessel
      .save()
      // .then(() => console.log("New Vessels added"))
      .catch((err) => console.log("Error: " + err))

    k++
  } while (k < DeduplicatedVesselUrlArray.length)

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
    portArrival
      .save()
      // .then(() => console.log("Port Arrival added"))
      .catch((err) => console.log("Error: " + err))

    i++
  } while (i < allArrivals.length)

  console.log(allArrivals.length + " Port Arrivals added")

  return allArrivalsVesselUrls
}
