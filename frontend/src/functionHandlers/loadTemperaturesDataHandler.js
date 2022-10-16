import axios from "axios"

// -------------------------------------------------------
// Function to prepare the temperatures table in the SQL database
// -------------------------------------------------------
export const prepareTemperaturesTable = () =>
  axios
    .post("http://localhost:4000/api/weather/prepareTemperaturesTable")
    .then(() => console.log("Empty temperatures table prepared"))
    .catch((err) => console.log(err))

// -------------------------------------------------------
// Function to fetch all Temperature data
// -------------------------------------------------------
export const getTemperatureData = (url) =>
  axios
    .get(url)
    // .get("http://localhost:4000/api/weather/getTemperatures")
    .then((response) => response.data)
    .catch((err) => console.log(err))

// -------------------------------------------------------
// Function to fetch all Temperatures data into the SQL database
// -------------------------------------------------------
export const loadTemperaturesDataHandler = () => {
  // Prepare empty temperatures table in the database & show result
  prepareTemperaturesTable()
}

export { getTemperatureData as default }
