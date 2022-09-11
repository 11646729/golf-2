import axios from "axios"

// -------------------------------------------------------
// Function to fetch all GTFS Bus data into the SQL database
// -------------------------------------------------------
export var loadBusTransportDataHandler = () => {
  // The import GTFS function prepares the empty database table

  // Import GTFS Data from Website into local SQL database
  importGTFSBusData()
}

// -------------------------------------------------------
// Function to import the GTFS data into the SQL database
// -------------------------------------------------------
var importGTFSBusData = async () => {
  let params = {}
  let config = {
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
    },
  }

  await axios
    .post("http://localhost:4000/api/bus/importGTFSBusData", params, config)
    //    .then((returnedData) => console.log(returnedData))
    .then(() => alert("Import now successful"))
    .catch((err) => console.log(err))
}
