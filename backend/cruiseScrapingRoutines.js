import axios from "axios"
import cheerio from "cheerio"
import { getAndSavePortArrivals } from "./scrapeArrivals"
import { getSingleVesselDetails } from "./scrapeVessels"
import { deleteAllPortArrivals } from "./controllers/cruiseControllers/v1/portArrivalsController"
import { deleteAllVessels } from "./controllers/cruiseControllers/v1/vesselController"
import { openSqlDbConnection, closeSqlDbConnection } from "./fileUtilities"

// -------------------------------------------------------
// Fetch Port Arrivals & Vessel Details
// Path: Function called in switchBoard
// -------------------------------------------------------
export const fetchPortArrivalsAndVessels = async (req, res) => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  // Delete all existing Port Arrivals & Vessel Details from the database
  deleteAllPortArrivals(db)
  deleteAllVessels(db)

  // Get the Port Name & Associated values
  // const port = "Belfast".toUpperCase()
  // const port = "Geiranger".toUpperCase()
  const port = "Bergen".toUpperCase()
  const portUrl = port + "_PORT_URL"
  const portName = process.env[portUrl]

  // Thirdly get the available Months & Years for chosen Port
  const scheduledPeriods = await getScheduleMonths(portName)

  if (scheduledPeriods.length === 0) {
    console.log("CruiseMapper currently has no ship schedule for Selected Port")
  } else {
    // Fourthly get all the Vessel Arrivals per Month
    let vesselUrls = await getAndSavePortArrivals(
      db,
      scheduledPeriods,
      port,
      portName
    )

    // Now remove duplicates and store Urls in DeduplicatedVesselUrlArray array
    const DeduplicatedVesselUrlArray = Array.from(new Set(vesselUrls))

    // Sort array ascending
    DeduplicatedVesselUrlArray.sort()

    let loop = 0
    do {
      // Extract urls for vessels & store in newVessel array
      await getSingleVesselDetails(db, DeduplicatedVesselUrlArray[loop])
      // saveVessel(DeduplicatedVesselUrlArray[loop])

      loop++
    } while (loop < DeduplicatedVesselUrlArray.length)

    // Length of vesselUrls array is the Number of Vessel Arrivals
    console.log(vesselUrls.length + " Port Arrivals added")
    console.log(DeduplicatedVesselUrlArray.length + " Vessels added")
  }

  // Disconnect from the SQLite database
  closeSqlDbConnection(db)
}

// -------------------------------------------------------
// Fetch Year & Months which show Vessel Arrival Data
// Path: Local function called by fetchPortArrivalsAndVessels
// -------------------------------------------------------
const getScheduleMonths = async (portName) => {
  let scheduledPeriods = []

  let initialPeriod = new Date().toISOString().slice(0, 7)
  // console.log(initialPeriod)

  let initialUrl =
    process.env.CRUISE_MAPPER_URL +
    portName +
    "?tab=schedule&month=" +
    initialPeriod +
    "#schedule"

  // Fetch the initial data
  const { data: html } = await axios.get(initialUrl)

  // Load up cheerio
  const $ = cheerio.load(html)

  $("#schedule > div:nth-child(2) > div.col-xs-8.thisMonth option").each(
    (i, item) => {
      const monthYearString = $(item).attr("value")

      scheduledPeriods.push({
        monthYearString,
      })
    }
  )

  return scheduledPeriods
}
