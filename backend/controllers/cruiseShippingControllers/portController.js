import { getAllVesselArrivals } from "../../scrapeArrivals"
import db from "../../db"

// Site Home Page
export function index(req, res, next) {
  res.send("NOT IMPLEMENTED: portController Index path")
}

// Path localhost:3000/cruiseShips/portArrivals
export async function port_arrivals(req, res) {
  //   console.log("Scraping!")
  //   const allArrivals = await getAllVesselArrivals()
  //   res.json(allArrivals)
  //   db.get("arrivals")
  //     .push({
  //       date: Date.now(),
  //       allArrivals
  //     })
  //     .write()
  //   console.log("Scraping done at " + Date.now())
}
