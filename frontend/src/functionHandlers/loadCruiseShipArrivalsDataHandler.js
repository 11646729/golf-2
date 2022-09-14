import axios from "axios"
import moment from "moment"

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

// -------------------------------------------------------
// Function to fetch all Cruise Vessel data
// -------------------------------------------------------
export var getPortArrivalsData = async (url) => {
  // Guard clause
  if (url == null) {
    console.log("Error: url == null in getCruiseVesselData in utilities.js")
    return
  }

  let resultData = await axios({
    url: url,
    method: "GET",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  return resultData.data
}

// -------------------------------------------------------
// Function to fetch Cruise Vessel Position data
// -------------------------------------------------------
export var getCruiseVesselPositionData = async (url, test, portArrivals) => {
  // Guard clauses
  if (url == null) {
    console.log(
      "Error: url == null in getCruiseVesselPositionData in utilities.js"
    )
    return
  }

  if (portArrivals == null) {
    console.log(
      "Error: portArrivals == null in getCruiseVesselPositionData in utilities.js"
    )
    return
  }

  // Extract urls here - THIS WORKS
  var urls = []
  var loop = 0
  do {
    let shipUrl = {
      url: portArrivals[loop].vesselnameurl,
    }

    urls.push(shipUrl)

    loop++
  } while (loop < portArrivals.length)

  // console.log(urls)

  var resultData = []

  if (test === "Test") {
    console.log("Static Test Data")
    resultData = getCruiseVesselPositionTestData()
  } else {
    console.log("Real Data")

    // Fetch the initial data
    resultData = await axios({
      url: url,
      params: {
        portArrivals: portArrivals,
      },
      method: "GET",
      timeout: 8000,
      headers: {
        "Content-Type": "application/json",
      },
    })
  }

  return resultData.data
}

// -------------------------------------------------------
// Function to fetch Cruise Vessel Position data
// -------------------------------------------------------
var getCruiseVesselPositionTestData = () => {
  var longlats = [
    [55.95473, -4.758], // lat, lng
    [55.843985, -4.9333],
    [55.42563, -4.917513],
    [55.001906, -5.34192],
    [54.719465, -5.514335],
    [54.62649822725435, -5.884617360308293],
  ]

  let resultData = {}
  let shipPositions = []
  let loop = 0
  // var i = setInterval(function () {
  do {
    // if (loop < longlats.length) {
    var utcMoment = moment.utc()
    var utcDate = new Date(utcMoment.format())

    let shipPosition = {
      index: loop + 1,
      timestamp: utcDate,
      lat: longlats[loop][0],
      lng: longlats[loop][1],
    }

    shipPositions.push(shipPosition)

    console.log(shipPositions)

    loop++
    // res.send(shipPosition)
    // return shipPosition
    // } else {
    // clearInterval(i)
    // res.send(shipPositions)
    // }
  } while (loop < longlats.length)
  // }, 0)

  resultData = {
    config: "testData",
    data: shipPositions,
  }

  console.log(resultData)

  return resultData
}
