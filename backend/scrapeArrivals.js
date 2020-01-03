import axios from "axios"
import cheerio from "cheerio"

export async function getArrivalsHTML(url) {
  const { data: html } = await axios.get(url)
  return html
}

export async function getArrivalsSchedule(html) {
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

    //  Date of Arrival
    let temp_arrival_date = $(item)
      .children("td")
      .html()
      .replace(/,/, "") // Removes the comma
    // Returns: <span>29 April 2020</span><br><span class="bold">Wednesday</span><br>

    // Now extract the date string
    let str = temp_arrival_date
    let n = str.indexOf("2020")

    // Use ParseInt()

    const arrival_date = str.substr(6, n - 2) // 6 = after <span>, 4 = length of 2020, 2 = 6 - 4
    // const arrival_date = Date.parse(str.substr(6, n - 2))
    // TODO FOR YEARS OTHER THAN 2020

    // Day of the Week
    const arrival_day = $(item)
      .children("td")
      .find(".bold")
      .text()

    // Name of Vessel
    const vessel_shortcruise_name = $(item)
      .find("a")
      .text()

    // Url of Vessel Web Page
    const vessel_name_url = $(item)
      .find("a")
      .attr("href")

    // // Expected Time of Arrival
    let vessel_eta = $(item)
      .children("td")
      .next("td")
      .next("td")
      .html() // 03:00

    // Expected Time of Arrival
    // let vessel_eta = $(
    //   "#schedule > div.table-responsive > table > tbody > tr > td:nth-child(3)"
    // )
    //   .text()
    //   .trim()

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

    // Expected Time of Departure
    // let vessel_etd = $(
    //   "#schedule > div.table-responsive > table > tbody > tr > td:nth-child(4)"
    // )
    //   .text()
    //   .trim()

    // If No Departure Time Given
    if (vessel_etd == "") {
      vessel_etd = "Not Known"
    } else {
      vessel_etd = Date.parse(arrival_date + " " + vessel_etd + " GMT")
      var d = new Date(vessel_etd)
      vessel_etd = d.toUTCString()
    }

    // Push an object with the data onto our array
    vessel_arrival.push({
      databaseVersion,
      port_name,
      port_un_locode,
      //      arrival_date,
      //      arrival_day,
      vessel_shortcruise_name,
      vessel_eta,
      vessel_etd,
      vessel_name_url
    })
  })

  return vessel_arrival
}

export async function getSingleArrivalsSchedule(arrival_url) {
  const htmlData = await getArrivalsHTML(arrival_url)
  const vesselArrivals = await getArrivalsSchedule(htmlData)

  return vesselArrivals
}
