import axios from "axios"
import { getCommonData, postCommonData } from "./axios-common"

// -------------------------------------------------------
// Function to prepare the portarrivals table in the SQL database
// -------------------------------------------------------
const preparePortArrivalsTable = (url) => postCommonData(url)

// -------------------------------------------------------
// Function to prepare the vessels table in the SQL database
// -------------------------------------------------------
const prepareVesselsTable = (url) => postCommonData(url)

// -------------------------------------------------------
// Function to fetch all Cruise PortArrivals & Vessel data
// -------------------------------------------------------
const importPortArrivalsAndVesselsData = (url) => {
  const params = {
    portName: "Belfast",
  }
  const config = {
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
    },
  }

  axios
    .post(url, params, config)
    .then(() => console.log("Loading scraped vessel and port arrivals data"))
    .catch((err) => console.log(err))
}

// -------------------------------------------------------
// Function to fetch all Cruise Vessel data
// -------------------------------------------------------
export const getPortArrivalsData = (url) => getCommonData(url)

// -------------------------------------------------------
// Function to fetch Cruise Vessel Position data
// -------------------------------------------------------
export const getCruiseVesselPositionData = async (portArrivals) => {
  // Guard clause
  if (portArrivals == null) {
    console.log(
      "Error: portArrivals == null in getCruiseVesselPositionData in utilities.js"
    )
    return
  }

  // Extract urls
  const urls = []
  let loop = 0
  do {
    urls.push(portArrivals[loop].vesselnameurl)

    loop += 1
  } while (loop < portArrivals.length)

  let resultData = []

  // Fetch the initial data - DO NOT CHANGE
  resultData = await axios({
    url: "http://localhost:4000/api/cruise/vesselPositions",
    params: {
      portArrivals: urls,
    },
    method: "GET",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  return resultData.data
}

// -------------------------------------------------------
// Function to fetch all Cruise PortArrivals & Vessel data into the SQL database
// -------------------------------------------------------
export const loadCruiseShipArrivalsDataHandler = () => {
  // Prepare empty port arrivals table in the database & show result
  preparePortArrivalsTable(
    "http://localhost:4000/api/cruise/preparePortArrivalsTable"
  )

  // Prepare empty vessels table in the database & show result
  prepareVesselsTable("http://localhost:4000/api/cruise/prepareVesselsTable")

  // Import the scraped data into the database & show result
  importPortArrivalsAndVesselsData(
    "http://localhost:4000/api/cruise/importPortArrivalsAndVesselsData"
  )
}

export { getPortArrivalsData as default }
