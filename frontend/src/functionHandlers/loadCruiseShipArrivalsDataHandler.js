import axios from "axios"

// -------------------------------------------------------
// Function to fetch all Cruise PortArrivals & Vessel data into the SQL database
// -------------------------------------------------------
export const loadCruiseShipArrivalsDataHandler = () => {
  // Prepare empty port arrivals table in the database & show result
  preparePortArrivalsTable()

  // Prepare empty vessels table in the database & show result
  prepareVesselsTable()

  // Import the scraped data into the database & show result
  importPortArrivalsAndVesselsData()
}

// -------------------------------------------------------
// Function to prepare the portarrivals table in the SQL database
// -------------------------------------------------------
var preparePortArrivalsTable = async () => {
  let params = {}
  let config = {
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  }

  await axios
    .post(
      "http://localhost:4000/api/cruise/preparePortArrivalsTable",
      params,
      config
    )
    //    .then((returnedData) => console.log(returnedData))
    .then(() => alert("Empty portarrivals table prepared"))
    .catch((err) => console.log(err))
}

// -------------------------------------------------------
// Function to prepare the vessels table in the SQL database
// -------------------------------------------------------
var prepareVesselsTable = async () => {
  let params = {}
  let config = {
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  }

  await axios
    .post(
      "http://localhost:4000/api/cruise/prepareVesselsTable",
      params,
      config
    )
    //    .then((returnedData) => console.log(returnedData))
    .then(() => alert("Empty vessels table prepared"))
    .catch((err) => console.log(err))
}

// -------------------------------------------------------
// Function to fetch all Cruise PortArrivals & Vessel data
// -------------------------------------------------------
var importPortArrivalsAndVesselsData = async () => {
  let params = {
    portName: "Belfast",
  }
  let config = {
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
    },
  }

  await axios
    .post(
      "http://localhost:4000/api/cruise/importPortArrivalsAndVesselsData",
      params,
      config
    )
    //    .then((returnedData) => console.log(returnedData))
    .then(() => alert("Loading scraped vessel and port arrivals data"))
    .catch((err) => console.log(err))
}
