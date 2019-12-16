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

    // define and navigate to a web page
    const pageUrl = "https://www.belfast-harbour.co.uk/cruise-schedule/"

    await page.goto(pageUrl)

    const scrapedData = await page.evaluate(() => {
      // Create an empty array that will store our data
      const tempScrapedData = []

      let elements = document.querySelectorAll(".cruise-row")

      for (var element of elements) {
        let databaseVersion = "1.0"
        let timestamp = Date.now()

        let tempDay =
          element.childNodes[0].childNodes[0].childNodes[0].childNodes[0]
            .childNodes[0].childNodes[0].childNodes[0].textContent
        let day = parseInt(tempDay)

        let tempMonth =
          element.childNodes[0].childNodes[0].childNodes[0].childNodes[0]
            .childNodes[0].childNodes[1].childNodes[2].textContent
        let month = new Date(Date.parse(tempMonth + " 1, 2012")).getMonth() + 1

        let year = new Date(timestamp).getFullYear()

        let eta =
          element.childNodes[0].childNodes[0].childNodes[0].childNodes[1]
            .childNodes[0].childNodes[0].childNodes[0].childNodes[0].textContent

        let etd =
          element.childNodes[0].childNodes[0].childNodes[0].childNodes[1]
            .childNodes[0].childNodes[2].childNodes[0].childNodes[0].textContent

        let company = element.childNodes[0].childNodes[1].childNodes[1].childNodes[0].childNodes[0].textContent.trim()
        let vesselName = element.childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].textContent.trim()

        // Push an object with the data onto our array
        tempScrapedData.push({
          // pageUrl,
          databaseVersion,
          timestamp,
          day,
          month,
          year,
          eta,
          etd,
          company,
          vesselName
        })
      }

      // Return our data array
      return tempScrapedData
    })

    await browser.close()
    return scrapedData
  } catch (error) {
    console.log("An error has been thrown: " + error)
  }

  console.log("Result is: " + scrapedData)
}

module.exports = {
  scrape
}
