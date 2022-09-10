import {
  preparePortArrivalsTable,
  prepareVesselsTable,
  importPortArrivalsAndVesselsData,
} from "../axiosUtilities"

// Function to fetch all Cruise PortArrivals & Vessel data
export const loadCruiseShipArrivalsDataHandler = () => {
  // Prepare empty port arrivals table in the database & show result
  alert(preparePortArrivalsTable(true))

  // Prepare empty vessels table in the database & show result
  alert(prepareVesselsTable(true))

  // Import the scraped data into the database & show result
  alert(importPortArrivalsAndVesselsData(true))

  //  alert("Port Arrivals & Vessels data imported")
}
