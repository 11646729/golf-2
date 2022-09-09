import axios from "axios"
import {
  preparePortArrivalsTable,
  prepareVesselsTable,
} from "../axiosUtilities"

/*
Logic:
Check if tables exist
If they exist then empty
If they don't exist then create them
*/

// Function to fetch all Cruise PortArrivals & Vessel data
export const loadCruiseShipArrivalsDataHandler = async () => {
  // Prepare portarrivals table
  var showResult = true
  var result = ""

  result = preparePortArrivalsTable(showResult)

  if (showResult) {
    alert(result)
  }

  // Prepare vessels table
  showResult = true
  result = ""

  result = prepareVesselsTable(showResult)

  if (showResult) {
    alert(result)
  }

  // Import the scraped data into the database
  await axios({
    url: "http://localhost:4000/api/cruise/importPortArrivalsAndVesselsData",
    params: {
      portName: "Belfast",
    },
    method: "POST",
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resultData) => console.log(resultData))
    .catch((err) => console.log(err))

  alert("Port Arrivals & Vessels data imported")
}
