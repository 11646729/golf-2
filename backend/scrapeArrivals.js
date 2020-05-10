"use strict"

import axios from "axios"
import cheerio from "cheerio"
import dotenv from "dotenv"

dotenv.config()

export async function getAllVesselArrivals() {
  let allVesselMovements = []
  let vesselArrivals = []

  const scheduledPeriod = await getScheduleMonths()

  let i = 0

  do {
    const period = String(scheduledPeriod[i].monthYearString)
    vesselArrivals = await getVesselArrivals(period)

    let j = 0

    do {
      allVesselMovements.push(vesselArrivals[j])

      j++
    } while (j < vesselArrivals.length)

    i++
  } while (i < scheduledPeriod.length)

  return allVesselMovements
}

export async function getScheduleMonths() {
  // Fetch the initial data
  const { data: html } = await axios.get(process.env.INITIAL_URL)

  // load up cheerio
  const $ = cheerio.load(html)

  let monthYearStringArray = []

  $("#schedule > div:nth-child(2) > div.col-xs-8.thisMonth option").each(
    (i, item) => {
      const monthYearString = $(item).attr("value")

      monthYearStringArray.push({
        monthYearString,
      })
    }
  )

  return monthYearStringArray
}

export async function getVesselArrivals(period) {
  let arrivalUrl =
    process.env.CRUISE_MAPPER_URL +
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
      const databaseVersion = process.env.DATABASE_VERSION

      // Port Name
      const portName = process.env.BELFAST_PORT_NAME

      // Port UN Locode
      const portUnLocode = process.env.BELFAST_PORT_UN_LOCODE

      // Belfast Port Coordinates in GeoJSON
      const portCoordinates = {
        type: "Point",
        coordinates: [
          process.env.BELFAST_PORT_LONGITUDE,
          process.env.BELFAST_PORT_LATITUDE,
        ],
      }

      // Name of Vessel
      const vesselShortcruiseName = $(item).find("a").text()

      //  Date of Arrival
      let arrivalDate = $(item)
        .children("td")
        .children("span")
        .html()
        .replace(/,/, "") // Removes the comma

      // // Expected Time of Arrival
      let vesselEta = $(item).children("td").next("td").next("td").html()

      // If No Arrival Time Given
      if (vesselEta == "") {
        vesselEta = "Not Known"
      } else {
        vesselEta = Date.parse(arrivalDate + " " + vesselEta + " GMT")
        var d = new Date(vesselEta)
        vesselEta = d.toISOString()
      }

      // // Expected Time of Departure
      let vesselEtd = $(item).children("td").last("td").html()

      // If No Departure Time Given
      if (vesselEtd == "") {
        vesselEtd = "Not Known"
      } else {
        vesselEtd = Date.parse(arrivalDate + " " + vesselEtd + " GMT")
        var d = new Date(vesselEtd)
        vesselEtd = d.toISOString()
      }

      // Url of Vessel Web Page
      const vesselNameUrl = $(item).find("a").attr("href")

      // Push an object with the data onto our array
      vesselArrival.push({
        databaseVersion,
        portName,
        portUnLocode,
        portCoordinates,
        vesselShortcruiseName,
        vesselEta,
        vesselEtd,
        vesselNameUrl,
      })
    }
  })

  // Return our data array
  return vesselArrival
}
