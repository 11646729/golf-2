import axios from "axios"

// -------------------------------------------------------
// Function to prepare the temperatures table in the SQL database
// -------------------------------------------------------
const prepareTemperaturesTable = async (url) => {
  return await axios
    .post(url)
    .then((response) => response.data)
    .catch((err) => console.log(err))
}

// -------------------------------------------------------
// Function to fetch all Temperatures data
// -------------------------------------------------------
export const getTemperaturesData = async (url) => {
  return await axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => console.log(err))
}
// -------------------------------------------------------
// Function to fetch Open Weather data
// -------------------------------------------------------
export const getOpenWeatherData = async (url) => {
  return await axios
    .get(url)
    .then((response) => console.log(response.data))
    .catch((err) => console.log(err))
}

// -------------------------------------------------------
// Function to fetch all Temperatures data into the SQL database
// -------------------------------------------------------
export const loadTemperaturesDataHandler = () => {
  // Prepare empty temperatures table in the database & show result
  prepareTemperaturesTable("http://localhost:4000/api/weather/getTemperatures")
}

export { getTemperaturesData as default }
