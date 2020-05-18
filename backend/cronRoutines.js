"use strict"

import { getAllVesselArrivals } from "./scrapeArrivals"
import { getSingleVesselDetails } from "./scrapeVessels"
import { PortArrivalSchema } from "./models/cruiseShippingModels/v1/portArrivalSchema"
import { VesselDetailsSchema } from "./models/cruiseShippingModels/v1/vesselDetailsSchema"
import { CoordsSchema } from "./models/commonModels/coordsSchema"

export async function getAndSavePortArrivals() {
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
    let title_temp = vesselDetails[0].title
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

    // Now create a model instance
    const newVessel = new VesselDetailsSchema({
      databaseVersion: database_version,
      vesselNameUrl: vessel_name_url,
      title: title_temp,
      vesselType: vessel_type,
      vesselName: vessel_name,
      vesselFlag: vessel_flag,
      vesselShortOperator: vessel_short_operator,
      vesselLongOperator: vessel_long_operator,
      vesselYearBuilt: vessel_year_built,
      vesselLengthMetres: vessel_length_metres,
      vesselWidthMetres: vessel_width_metres,
      vesselGrossTonnage: vessel_gross_tonnage,
      vesselAverageSpeedKnots: vessel_average_speed_knots,
      vesselMaxSpeedKnots: vessel_max_speed_knots,
      vesselAverageDraughtMetres: vessel_average_draught_metres,
      vesselImoNumber: vessel_imo_number,
      vesselMmsiNumber: vessel_mmsi_number,
      vesselCallsign: vessel_callsign,
      vesselTypicalPassengers: vessel_typical_passengers,
      vesselTypicalCrew: vessel_typical_crew,
    })

    // Now save in mongoDB
    newVessel
      .save()
      // .then(() => console.log("New Vessels added"))
      .catch((err) => console.log("Error: " + err))

    k++
  } while (k < DeduplicatedVesselUrlArray.length)

  console.log(DeduplicatedVesselUrlArray.length + " Vessel Details added")
}
