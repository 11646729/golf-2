const puppeteer = require("puppeteer")

// Scrape function
// this wrapper means immediately execute this code
let scrape = async () => {
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
    const pageUrl =
      "https://www.cruisemapper.com/ports/belfast-port-114?tab=schedule&month=2020-03#schedule"

    await page.goto(pageUrl)

    // Now start Data Scraping
    const scrapedData = await page.evaluate(() => {
      // Create an empty array that will store our data
      const tempScrapedData = []

      // Database version
      let databaseVersion = "1.0"

      // Port Name
      let port_name = "Belfast"

      // Port UN Locode
      let port_un_locode = "GBBEL"

      //  Date of Arrival
      let arrival_date = document
        .querySelector(
          "#schedule > div.table-responsive > table > tbody > tr > td:nth-child(1) > span:nth-child(1)"
        )
        .textContent.trim()

      // Day of the Week
      let arrival_day = document
        .querySelector(
          "#schedule > div.table-responsive > table > tbody > tr > td:nth-child(1) > span.bold"
        )
        .textContent.trim()

      // Name of Vessel
      let items = document.querySelectorAll(
        "#schedule > div.table-responsive > table > tbody > tr > td.bold > a"
      )

      let results = []
      items.forEach(item => {
        results.push({
          url: item.getAttribute("href"),
          text: item.innerText
        })
      })

      let vessel_shortcruise_name = results[0].text

      // Url of Vessel Web Page
      let vessel_name_url = results[0].url

      // Expected Time of Arrival
      let vessel_eta = document
        .querySelector(
          "#schedule > div.table-responsive > table > tbody > tr > td:nth-child(3)"
        )
        .textContent.trim()

      // Expected Time of Departure
      let vessel_etd = document
        .querySelector(
          "#schedule > div.table-responsive > table > tbody > tr > td:nth-child(4)"
        )
        .textContent.trim()

      // Push an object with the data onto our array
      tempScrapedData.push({
        databaseVersion,
        port_name,
        port_un_locode,
        arrival_date,
        arrival_day,
        vessel_shortcruise_name,
        vessel_eta,
        vessel_etd,
        vessel_name_url
      })

      // Return our data array
      return tempScrapedData
    })

    await browser.close()

    // Return our data array
    return scrapedData
  } catch (error) {
    console.log("An error has been thrown: " + error)
  }
}

module.exports = {
  scrape
}
