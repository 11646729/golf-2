import axios from "axios"
import cheerio from "cheerio"
import { PortArrivalSchema } from "./models/cruiseModels/v1/portArrivalSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// -------------------------------------------------------
// Fetch All Port Arrivals Details
// Path: Local function called by fetchPortArrivalsAndVessels
// -------------------------------------------------------
export const getAndSavePortArrivals = async (scheduledPeriods) => {
  let allArrivalsVesselUrls = []
  let allArrivals = []
  let vesselArrivals = []

  let loop = 0
  do {
    const period = String(scheduledPeriods[loop].monthYearString)
    vesselArrivals = await getVesselArrivals(period)

    let j = 0
    do {
      allArrivals.push(vesselArrivals[j])

      j++
    } while (j < vesselArrivals.length)

    loop++
  } while (loop < scheduledPeriods.length)

  // ------------------------------------------------------

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

const getVesselArrivals = async (period) => {
  let arrivalUrl =
    process.env.TEST_CRUISE_MAPPER_URL +
    "?tab=schedule&month=" +
    period +
    "#schedule"

  const { data: html } = await axios.get(arrivalUrl)

  // load up cheerio
  const $ = cheerio.load(html)

  let vesselArrival = []

  $(".portItemSchedule tr").each((i, item) => {
    // Ignore the table heading
    if (i > 0) {
      // Database version
      const database_version = process.env.DATABASE_VERSION

      // Port Name
      const port_name = process.env.GEIRANGER_PORT_NAME

      // Port UN Locode
      const port_un_locode = process.env.GEIRANGER_PORT_UN_LOCODE

      // Belfast Port Coordinates in GeoJSON
      const port_coordinates = new CoordsSchema({
        lat: process.env.GEIRANGER_PORT_LATITUDE,
        lng: process.env.GEIRANGER_PORT_LONGITUDE,
      })

      // Name of Vessel
      const vessel_short_cruise_name = $(item).find("a").text()

      //  Date of Arrival
      let arrivalDate = $(item)
        .children("td")
        .children("span")
        .html()
        .replace(/,/, "") // Removes the comma

      // Expected Time of Arrival
      let vessel_eta = $(item).children("td").next("td").next("td").html()

      // If No Arrival Time Given
      if (vessel_eta == "") {
        vessel_eta = "Not Known"
      } else {
        vessel_eta = Date.parse(arrivalDate + " " + vessel_eta + " GMT")
        var d = new Date(vessel_eta)
        vessel_eta = d.toISOString()
      }

      // Expected Time of Departure
      let vessel_etd = $(item).children("td").last("td").html()

      // If No Departure Time Given
      if (vessel_etd == "") {
        vessel_etd = "Not Known"
      } else {
        vessel_etd = Date.parse(arrivalDate + " " + vessel_etd + " GMT")
        var d = new Date(vessel_etd)
        vessel_etd = d.toISOString()
      }

      // Url of Vessel Web Page
      const vessel_name_url = $(item).find("a").attr("href")

      const portArrival = new PortArrivalSchema({
        databaseVersion: database_version,
        portName: port_name,
        portUnLocode: port_un_locode,
        portCoordinates: port_coordinates,
        vesselShortCruiseName: vessel_short_cruise_name,
        vesselEta: vessel_eta,
        vesselEtd: vessel_etd,
        vesselNameUrl: vessel_name_url,
      })

      // Push an object with the data onto our array
      vesselArrival.push({
        portArrival,
      })
    }
  })

  // Return our data array
  return vesselArrival
}
