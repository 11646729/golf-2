import {
  preparePortArrivalsTable,
  prepareVesselsTable,
  importPortArrivalsAndVesselsData,
} from "../axiosUtilities"

// Function to fetch all Cruise PortArrivals & Vessel data
export const loadCruiseShipArrivalsDataHandler = async () => {
  // Prepare vessels & portarrivals tables
  var showResult = true

  alert(preparePortArrivalsTable(showResult))

  alert(prepareVesselsTable(showResult))

  // Import the scraped data into the database
  importPortArrivalsAndVesselsData()

  alert(`Port Arrivals & Vessels data imported`)
}
