import axios from "axios"
import cheerio from "cheerio"
import { PortArrivalSchema } from "./models/cruiseModels/v1/portArrivalSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// -------------------------------------------------------
// Fetch All Port Arrivals Details
// Path: Local function called by fetchPortArrivalsAndVessels
// -------------------------------------------------------
export const getAndSavePortArrivals = async (scheduledPeriods) => {
  let allVesselArrivals = []
  let periodVesselArrivals = []

  let loop = 0
  do {
    const period = String(scheduledPeriods[loop].monthYearString)
    periodVesselArrivals = await getSingleMonthPortArrival(period)

    let j = 0
    do {
      allVesselArrivals.push(periodVesselArrivals[j])

      j++
    } while (j < periodVesselArrivals.length)

    loop++
  } while (loop < scheduledPeriods.length)

  return allVesselArrivals
}

// -----------------------------------------------------
// Fetch a Single Port Arrival
// Path: Local function called by getAndSavePortArrivals
// -----------------------------------------------------
const getSingleMonthPortArrival = async (period) => {
  let arrivalUrl =
    "https://www.cruisemapper.com/ports/" +
    process.env.GEIRANGER_PORT_URL +
    "?tab=schedule&month=" +
    period +
    "#schedule"

  const { data: html } = await axios.get(arrivalUrl)

  // load up cheerio
  const $ = cheerio.load(html)

  // let vesselArrival = []
  let vesselUrls = []

  $(".portItemSchedule tr").each((i, item) => {
    // Ignore the table heading
    if (i > 0) {
      // Database version
      const database_version = process.env.DATABASE_VERSION

      // Port Name
      const port_name = process.env.BELFAST_PORT_NAME

      // Port UN Locode
      const port_un_locode = process.env.BELFAST_PORT_UN_LOCODE

      // Belfast Port Coordinates in GeoJSON
      const port_coordinates = new CoordsSchema({
        lat: process.env.BELFAST_PORT_LATITUDE,
        lng: process.env.BELFAST_PORT_LONGITUDE,
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
      if (
        typeof vessel_name_url === "string" ||
        vessel_name_url instanceof String
      ) {
        // it's a string
        vesselUrls.push(vessel_name_url)
      }
      // it's something else
      else console.log("Error, vessel_name_url is not a string")

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

      // Now save in mongoDB
      portArrival.save().catch((err) => console.log("Error: " + err))
    }
  })

  // Return array of vessel Urls
  return vesselUrls
}
