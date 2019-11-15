var express = require("express")
var router = express.Router()

/* GET users listing. */
router.get("/", (req, res, next) => {
  res.send("respond with a resource")
})

// To run puppetteer on a schedule taken from https://stackoverflow.com/questions/48957964/automatic-scheduled-javascript-on-website
// const puppeteer = require('puppeteer');
// setInterval(async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto('https://example.com');
//     await page.evaluate(() => {
//         // your snippet
//     });
//     await browser.close();

// }, 1 * 60 * 60 * 1000); // every 1 hour

module.exports = router
