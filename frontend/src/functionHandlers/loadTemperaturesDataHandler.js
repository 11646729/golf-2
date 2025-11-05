import axios from "axios"

// -------------------------------------------------------
// Function to prepare the temperatures table in the SQL database
// -------------------------------------------------------
const prepareTemperaturesTable = (url) =>
  axios
    .post(url)
    .then((response) => response.data)
    .catch((err) => console.log(err))

// -------------------------------------------------------
// Function to fetch all Temperatures data
// -------------------------------------------------------
export const getTemperaturesData = (url) =>
  axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => console.log(err))

// -------------------------------------------------------
// Function to fetch all Temperatures data into the SQL database
// -------------------------------------------------------
export const loadTemperaturesDataHandler = () => {
  // Prepare empty temperatures table in the database & show result
  prepareTemperaturesTable(
    "http://localhost:4000/api/weather/prepareTemperaturesTable"
  )
}
