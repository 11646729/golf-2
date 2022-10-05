import axios from "axios"

// -------------------------------------------------------
// Function to prepare the temperatures table in the SQL database
// -------------------------------------------------------
const prepareTemperaturesTable = async () => {
  const params = {}
  const config = {
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
export const getTemperatureData = async () => {
  const resultData = await axios({
    url: "http://localhost:4000/api/weather/getTemperatures",
    method: "GET",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  return resultData.data
}

// -------------------------------------------------------
// Function to fetch all Temperatures data into the SQL database
// -------------------------------------------------------
export const loadTemperaturesDataHandler = () => {
  // Prepare empty temperatures table in the database & show result
  prepareTemperaturesTable()
}

export { getTemperatureData as default }
