import axios from "axios"
import cheerio from "cheerio"

export async function getScheduleMonths() {
  let arrival_url =
    "https://www.cruisemapper.com/ports/belfast-port-114?tab=schedule&month=2019-05#schedule"

  const { data: html } = await axios.get(arrival_url)

  // load up cheerio
  const $ = cheerio.load(html)

  let monthYearStringArray = []

  $(".portMonthSelect option").each((i, item) => {
    const monthYearString = $(item).attr("value")

    monthYearStringArray.push({
      monthYearString
    })
  })

  /* <select class="form-control portMonthSelect" name="calendar">
    <option value="2019-04">2019 April</option>
    <option value="2019-05" selected="">
      2019 May
    </option>
    <option value="2019-06">2019 June</option>
    <option value="2019-07">2019 July</option>
    <option value="2019-08">2019 August</option>
    <option value="2019-09">2019 September</option>
    <option value="2019-10">2019 October</option>
    <option value="2020-03">2020 March</option>
    <option value="2020-04">2020 April</option>
    <option value="2020-05">2020 May</option>
    <option value="2020-06">2020 June</option>
    <option value="2020-07">2020 July</option>
    <option value="2020-08">2020 August</option>
    <option value="2020-09">2020 September</option>
    <option value="2020-10">2020 October</option>
    <option value="2021-03">2021 March</option>
    <option value="2021-04">2021 April</option>
    <option value="2021-05">2021 May</option>
    <option value="2021-06">2021 June</option>
    <option value="2021-07">2021 July</option>
    <option value="2021-08">2021 August</option>
    <option value="2021-09">2021 September</option>
    <option value="2021-10">2021 October</option>
    <option value="2022-08">2022 August</option>
  </select> */

  return monthYearStringArray
}

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

  let vessel_arrival = []

  $(".portItemSchedule tr").each((i, item) => {
    // Ignore the table heading
    if (i > 0) {
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
      let arrival_date = $(item)
        .children("td")
        .children("span")
        .html()
        .replace(/,/, "") // Removes the comma

      // // Now extract the date string
      //      let n = temp_arrival_date.indexOf(selectedYear)
      //      const arrival_date = temp_arrival_date.substr(6, n - 2)

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
    }
  })

  return vessel_arrival
}
