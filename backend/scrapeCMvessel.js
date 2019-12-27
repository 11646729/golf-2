const puppeteer = require("puppeteer")

let pageUrl = ""

// Define and navigate to a web page
async function setUrl(tempPageUrl) {
  pageUrl = tempPageUrl
}

// Scrape function
// this wrapper means immediately execute this code
//let scrape = async () => {
let scrape = async function(arrivalValue) {
  //  }
  // Wrapper to catch errors
  try {
    // create a new browser instance
    const browser = await puppeteer.launch({
      headless: true
    })

    // create a page inside the browser
    const page = await browser.newPage()

    // define and set the user agent
    const userAgent =
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"
    page.setUserAgent(userAgent)

    // Define and navigate to a web page
    await page.goto(pageUrl)

    // Now start Data Scraping
    const scrapedData = await page.evaluate(() => {
      // Create an empty array that will store our data
      const tempScrapedData = []

      let title = document.querySelector("#review > h2").textContent.trim()

      // Database version
      let databaseVersion = "1.0"

      // Vessel Type
      let vessel_type = "Cruise Ship"

      //      let vessel_photo = ""
      //      let vessel_ais_name = ""

      let vessel_name = title.substr(4, 8)
      let vessel_flag = document
        .querySelector(
          "#review > div:nth-child(2) > div.col-md-6.specificationTable.pull-left > table > tbody > tr:nth-child(2) > td:nth-child(2)"
        )
        .textContent.trim()

      let vessel_short_operator = title.substr(0, 3)

      let vessel_long_operator = document
        .querySelector(
          "#review > div:nth-child(2) > div.col-md-6.specificationTable.pull-left > table > tbody > tr:nth-child(5) > td:nth-child(2)"
        )
        .textContent.trim()

      let vessel_year_built = document
        .querySelector(
          "#review > div:nth-child(2) > div.col-md-6.specificationTable.pull-left > table > tbody > tr:nth-child(1) > td:nth-child(2)"
        )
        .textContent.substr(0, 4)

      let vessel_length_metres = document
        .querySelector(
          "#review > div:nth-child(2) > div.col-md-6.specificationTable.pull-left > table > tbody > tr:nth-child(7) > td:nth-child(2)"
        )
        .textContent.trim()

      let vessel_width_metres = document
        .querySelector(
          "#review > div:nth-child(2) > div.col-md-6.specificationTable.pull-left > table > tbody > tr:nth-child(8) > td:nth-child(2)"
        )
        .textContent.trim()

      let vessel_average_draught_metres = "7.9"

      let vessel_gross_tonnage = document
        .querySelector(
          "#review > div:nth-child(2) > div.col-md-6.specificationTable.pull-left > table > tbody > tr:nth-child(9) > td:nth-child(2)"
        )
        .textContent.trim()

      let vessel_average_speed_knots = "13.5"
      let vessel_max_speed_knots = "21.7"
      let vessel_imo_number = "8217881"
      let vessel_mmsi_number = "311000343"
      let vessel_callsign = "C6BR5"

      let vessel_typical_passengers = "1250"
      let vessel_typical_crew = "660"

      // Push an object with the data onto our array
      tempScrapedData.push({
        // vessel_name_url,
        // pageUrl,
        title,
        databaseVersion,
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
      return tempScrapedData
    })

    await browser.close()
    return scrapedData
  } catch (error) {
    console.log("An error has been thrown: " + error)
  }
}

module.exports = {
  setUrl,
  scrape
}
