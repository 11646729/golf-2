import axios from "axios"
import cheerio from "cheerio"
import { savePortArrival } from "./controllers/cruiseControllers/v1/portArrivalsController"

// -------------------------------------------------------
// Fetch All Port Arrivals Details
// Path: Local function called by fetchPortArrivalsAndVessels
// -------------------------------------------------------
export const getAndSavePortArrivals = async (
  db,
  scheduledPeriods,
  port,
  portName
) => {
  let allVesselArrivals = []
  let periodVesselArrivals = []

  let loop = 0
  do {
    const period = String(scheduledPeriods[loop].monthYearString)
    periodVesselArrivals = await getSingleMonthPortArrival(
      db,
      period,
      port,
      portName
    )

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
const getSingleMonthPortArrival = async (db, period, port, portName) => {
  let arrivalUrl =
    process.env.CRUISE_MAPPER_URL +
    portName +
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
      // Port Name Associated values
      const port_name = portName
      const portLat = port + "_PORT_LATITUDE"
      const portLng = port + "_PORT_LONGITUDE"
      const portUnLocode = port + "_PORT_UN_LOCODE"

      // Port UN Locode
      const port_un_locode = process.env[portUnLocode]

      // Port Coordinates
      const portcoordinateslat = process.env[portLat]
      const portcoordinateslng = process.env[portLng]

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

      const newPortArrival = [
        process.env.DATABASE_VERSION,
        port_name,
        port_un_locode,
        portcoordinateslng,
        portcoordinateslat,
        vessel_short_cruise_name,
        vessel_eta,
        vessel_etd,
        vessel_name_url,
      ]

      // Now save in SQLite
      savePortArrival(db, newPortArrival)
    }
  })

  // Return array of vessel Urls
  return vesselUrls
}
