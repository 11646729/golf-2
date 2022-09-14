import axios from "axios"

// -------------------------------------------------------
// Function to fetch all Temperatures data into the SQL database
// -------------------------------------------------------
export const loadTemperaturesDataHandler = () => {
  // Prepare empty temperatures table in the database & show result
  prepareTemperaturesTable()
}

// -------------------------------------------------------
// Function to prepare the temperatures table in the SQL database
// -------------------------------------------------------
var prepareTemperaturesTable = async () => {
  let params = {}
  let config = {
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  }
  await axios
    .post(
      "http://localhost:4000/api/weather/prepareTemperaturesTable",
      params,
      config
    )
    //    .then((returnedData) => console.log(returnedData))
    .then(() => alert("Empty temperatures table prepared"))
    .catch((err) => console.log(err))
}

// -------------------------------------------------------
// Function to fetch all Temperature data
// -------------------------------------------------------
export var getTemperatureData = async (url) => {
  // Guard clause
  if (url == null) {
    console.log("Error: url == null in getTemperatureData in utilities.js")
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

export { getTemperatureData as default }
