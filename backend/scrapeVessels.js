import axios from "axios"
import cheerio from "cheerio"

export const getSingleVesselDetails = async (VesselUrl) => {
  // Fetch the initial data
  const { data: html } = await axios.get(VesselUrl)

  // Load up cheerio
  const $ = cheerio.load(html)

  try {
    const $ = cheerio.load(html)
  } catch (e) {
    console.log("Error thrown while scraping Vessels " + e) // handle error
  }

  // Create an empty array that will store our data
  const vessel_details = []

  // Cruise Ship Data url
  let vessel_name_url = VesselUrl

  // Database version
  const database_version = process.env.DATABASE_VERSION

  // Title
  let title = $("#review .title").text().trim()

  let vessel_type = "Passenger Ship"

  // Remove " Review and Specifications" from title to get vessel_name
  let vessel_name = title.substring(0, title.length - 26)

  // Vessel Flag
  let vessel_flag = $("td")
    .filter(function () {
      return $(this).text().trim() === "Flag state"
    })
    .next()
    .text()
    .trim()

  // If No Vessel Flag Available
  if (vessel_flag == "") {
    vessel_flag = "Not Known"
  }

  // Short Name of Vessel Operator
  let vessel_short_operator = title.substr(0, title.indexOf(" "))

  // Long Name of Vessel Operator
  let vessel_long_operator = $("td")
    .filter(function () {
      return $(this).text().trim() === "Operator"
    })
    .next()
    .text()

  // If No Vessel Operator Available
  if (vessel_long_operator == "") {
    vessel_long_operator = "Not Known"
  }

  // Year of Build
  const vessel_year_built_temp = $("td")
    .filter(function () {
      return $(this).text().trim() === "Year built"
    })
    .next()
    .text()

  let vessel_year_built = vessel_year_built_temp.substr(
    0,
    vessel_year_built_temp.indexOf("/") - 2
  )

  // If No Year of Build Available
  if (vessel_year_built == "") {
    vessel_year_built = "Not Known"
  }

  // Length of Vessel in metres
  const vessel_length_metres_temp = $("td")
    .filter(function () {
      return $(this).text().trim() === "Length (LOA)"
    })
    .next()
    .text()

  let vessel_length_metres = vessel_length_metres_temp.substr(
    0,
    vessel_length_metres_temp.indexOf("/") - 3
  )

  // If No Length of Vessel in metres Available
  if (vessel_length_metres == "") {
    vessel_length_metres = "Not Known"
  }

  // Width of Vessel in metres
  const vessel_width_metres_temp = $("td")
    .filter(function () {
      return $(this).text().trim() === "Beam (width)"
    })
    .next()
    .text()

  let vessel_width_metres = vessel_width_metres_temp.substr(
    0,
    vessel_width_metres_temp.indexOf("/") - 3
  )

  // If No Width of Vessel in metres Available
  if (vessel_width_metres == "") {
    vessel_width_metres = "Not Known"
  }

  // Gross Tonnage of Vessel
  const vessel_gross_tonnage_temp = $("td")
    .filter(function () {
      return $(this).text().trim() === "Gross Tonnage"
    })
    .next()
    .text()

  let vessel_gross_tonnage = vessel_gross_tonnage_temp.substr(
    0,
    vessel_gross_tonnage_temp.indexOf(" ")
  )

  // If No Gross Tonnage of Vessel Available
  if (vessel_gross_tonnage == "") {
    vessel_gross_tonnage = "Not Known"
  }

  // Vessel Average Speed
  // const vessel_average_speed_knots_temp = $("td")
  //   .filter(function() {
  //     return (
  //       $(this)
  //         .text()
  //         .trim() === "Speed"
  //     )
  //   })
  //   .next()
  //   .text()

  // let vessel_average_speed_knots = vessel_average_speed_knots_temp.substr(
  //   0,
  //   vessel_average_speed_knots_temp.indexOf("/") - 4
  // )

  // If No Vessel Average Speed Available
  // if (vessel_average_speed_knots == "") {
  //   vessel_average_speed_knots = "Not Known"
  // }

  // Vessel Maximum Speed
  const vessel_max_speed_knots_temp = $("td")
    .filter(function () {
      return $(this).text().trim() === "Speed"
    })
    .next()
    .text()

  let vessel_max_speed_knots = vessel_max_speed_knots_temp.substr(
    0,
    vessel_max_speed_knots_temp.indexOf("/") - 4
  )

  // If No Vessel Maximum Speed Available
  if (vessel_max_speed_knots == "") {
    vessel_max_speed_knots = "Not Known"
  }

  // Typical Number of Passengers
  const vessel_typical_passengers = $("td")
    .filter(function () {
      return $(this).text().trim() === "Passengers"
    })
    .next()
    .text()

  // If No Typical Number of Passengers Available
  if (vessel_typical_passengers == "") {
    vessel_typical_passengers = "Not Known"
  }

  // Typical Number of Crew
  const vessel_typical_crew = $("td")
    .filter(function () {
      return $(this).text().trim() === "Crew"
    })
    .next()
    .text()

  const vessel_average_speed_knots = "Not Known"
  const vessel_average_draught_metres = "7.9"
  const vessel_imo_number = "8217881"
  const vessel_mmsi_number = "311000343"
  const vessel_callsign = "C6BR5"

  // Push an object with the data onto our array
  vessel_details.push({
    database_version,
    vessel_name_url,
    title,
    vessel_type,
    // vessel_photo,
    // vessel_ais_name,
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
    vessel_typical_crew,
  })

  // Return our data array
  return vessel_details
}
