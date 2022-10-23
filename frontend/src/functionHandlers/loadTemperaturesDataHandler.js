import { getCommonData, postCommonData } from "./axios-common"

// -------------------------------------------------------
// Function to prepare the temperatures table in the SQL database
// -------------------------------------------------------
const prepareTemperaturesTable = (url) => postCommonData(url)

// -------------------------------------------------------
// Function to fetch all Temperatures data
// -------------------------------------------------------
export const getTemperaturesData = (url) => getCommonData(url)

// -------------------------------------------------------
// Function to fetch all Temperatures data into the SQL database
// -------------------------------------------------------
export const loadTemperaturesDataHandler = () => {
  // Prepare empty temperatures table in the database & show result
  prepareTemperaturesTable("http://localhost:4000/api/weather/getTemperatures")
}

export { getTemperaturesData as default }
