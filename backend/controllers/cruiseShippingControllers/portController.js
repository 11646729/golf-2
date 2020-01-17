import { getAllVesselArrivals } from "../../scrapeArrivals"

// Site Home Page
export function index(req, res, next) {
  res.send("NOT IMPLEMENTED: portController Index path")
}

// Path localhost:3000/cruiseShips/port
export async function port_arrivals(req, res) {
  console.log("Scraping!")

  const allArrivals = await getAllVesselArrivals()

  console.log(allArrivals)
  res.json(allArrivals)
}
