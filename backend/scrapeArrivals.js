import axios from "axios"
import cheerio from "cheerio"

export async function getVesselArrivals(selectedMonth, selectedYear) {
  let arrival_url =
    "https://www.cruisemapper.com/ports/belfast-port-114?tab=schedule&month=" +
    selectedYear +
    "-" +
    selectedMonth +
    "#schedule"

  const { data: html } = await axios.get(arrival_url)

  // load up cheerio
  const $ = cheerio.load(html)

  var vessel_arrival = []

  $(".newDay").each((i, item) => {
    // Database version
    const databaseVersion = "1.0"

    // Port Name
    const port_name = "Belfast"

    // Port UN Locode
    const port_un_locode = "GBBEL"

    // Name of Vessel
    const vessel_shortcruise_name = $(item)
      .find("a")
      .text()

    //  Date of Arrival
    let temp_arrival_date = $(item)
      .children("td")
      .html()
      .replace(/,/, "") // Removes the comma

    // Now extract the date string
    let n = temp_arrival_date.indexOf(selectedYear)
    const arrival_date = temp_arrival_date.substr(6, n - 2)

    // // Expected Time of Arrival
    let vessel_eta = $(item)
      .children("td")
      .next("td")
      .next("td")
      .html() // 03:00

    // If No Arrival Time Given
    if (vessel_eta == "") {
      vessel_eta = "Not Known"
    } else {
      vessel_eta = Date.parse(arrival_date + " " + vessel_eta + " GMT")
      var d = new Date(vessel_eta)
      vessel_eta = d.toUTCString()
    }

    // // Expected Time of Departure
    let vessel_etd = $(item)
      .children("td")
      .last("td")
      .html() // 14:00

    // If No Departure Time Given
    if (vessel_etd == "") {
      vessel_etd = "Not Known"
    } else {
      vessel_etd = Date.parse(arrival_date + " " + vessel_etd + " GMT")
      var d = new Date(vessel_etd)
      vessel_etd = d.toUTCString()
    }

    // Url of Vessel Web Page
    const vessel_name_url = $(item)
      .find("a")
      .attr("href")

    // Push an object with the data onto our array
    vessel_arrival.push({
      databaseVersion,
      port_name,
      port_un_locode,
      vessel_shortcruise_name,
      vessel_eta,
      vessel_etd,
      vessel_name_url
    })
  })

  return vessel_arrival
}
