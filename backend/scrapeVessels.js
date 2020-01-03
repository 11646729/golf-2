import axios from "axios"
import cheerio from "cheerio"

export async function getVesselHTML(url) {
  const { data: html } = await axios.get(url)
  return html
}

export async function getVesselDetails(html) {
  // load up cheerio
  const $ = cheerio.load(html)

  // Create an empty array that will store our data
  const vessel_details = []

  // Scrape Cruise Ship Data Here
  // ----------------------------
  const vessel_name_url = ""

  // Database version
  const databaseVersion = "1.0"

  const title = $("#review > h2")
    .text()
    .trim()

  const vessel_type = "Cruise Ship"

  //      let vessel_photo = ""
  //      let vessel_ais_name = ""
  // let vessel_name = title.substr(4, 8)

  const vessel_flag = $(
    "#review > div:nth-child(2) > div.col-md-6.specificationTable.pull-left > table > tbody > tr:nth-child(2) > td:nth-child(2)"
  )
    .text()
    .trim()

  const vessel_short_operator = title.substr(0, 3)

  const vessel_long_operator = $(
    "#review > div:nth-child(2) > div.col-md-6.specificationTable.pull-left > table > tbody > tr:nth-child(5) > td:nth-child(2)"
  )
    .text()
    .trim()

  const vessel_year_built = $(
    "#review > div:nth-child(2) > div.col-md-6.specificationTable.pull-left > table > tbody > tr:nth-child(1) > td:nth-child(2)"
  )
    .text()
    .substr(0, 4)

  const vessel_length_metres = $(
    "#review > div:nth-child(2) > div.col-md-6.specificationTable.pull-left > table > tbody > tr:nth-child(7) > td:nth-child(2)"
  )
    .text()
    .trim()

  const vessel_width_metres = $(
    "#review > div:nth-child(2) > div.col-md-6.specificationTable.pull-left > table > tbody > tr:nth-child(8) > td:nth-child(2)"
  )
    .text()
    .trim()

  const vessel_average_draught_metres = "7.9"

  const vessel_gross_tonnage = $(
    "#review > div:nth-child(2) > div.col-md-6.specificationTable.pull-left > table > tbody > tr:nth-child(9) > td:nth-child(2)"
  )
    .text()
    .trim()

  const vessel_average_speed_knots = "13.5"
  const vessel_max_speed_knots = "21.7"
  const vessel_imo_number = "8217881"
  const vessel_mmsi_number = "311000343"
  const vessel_callsign = "C6BR5"

  const vessel_typical_passengers = "1250"
  const vessel_typical_crew = "660"

  // Push an object with the data onto our array
  vessel_details.push({
    vessel_name_url,
    databaseVersion,
    title,
    vessel_type,
    // // vessel_photo,
    // // vessel_ais_name,
    // vessel_name,
    vessel_flag,
    vessel_short_operator,
    vessel_long_operator,
    vessel_year_built,
    vessel_length_metres,
    vessel_width_metres,
    vessel_average_draught_metres,
    vessel_gross_tonnage,
    vessel_average_speed_knots,
    vessel_max_speed_knots,
    vessel_imo_number,
    vessel_mmsi_number,
    vessel_callsign,

    vessel_typical_passengers,
    vessel_typical_crew
  })

  // Return our data array
  return vessel_details
}

export async function getSingleVesselDetails(vessel_url) {
  // Get Vessel Details
  const htmlVesselData = await getVesselHTML(vessel_url)
  const vesselDetails = await getVesselDetails(htmlVesselData)

  // Store Vessel Detail url in vesselDetails vessel_url field
  vesselDetails[0].vessel_name_url = vessel_url

  // Return our data array
  return vesselDetails
}