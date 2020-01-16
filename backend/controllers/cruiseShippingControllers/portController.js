import express from "express"
var router = express.Router()
//import { getAllVesselArrivals } from "../../scrapeArrivals"

// Site Home Page
// router.get("/", async (req, res, next) => {
//   res.send("NOT IMPLEMENTED: portController Index path")
// })

// router.get("/cruise", async (req, res, next) => {
//   console.log("Scraping!")

//   const allArrivals = await getAllVesselArrivals()

//   console.log(allArrivals)
//   res.json(allArrivals)
// })

// Display list of Ports
// exports.port = (req, res, next) => {
//   res.send("NOT IMPLEMENTED: Port list")
// }

module.exports = router
