import { getCommonData } from "./axios-common"

// -------------------------------------------------------
// Function to fetch all Crimes data
// -------------------------------------------------------
export const getCrimesData = (url) => getCommonData(url)

// -------------------------------------------------------
// Function to fetch all Crimes data into the SQL database
// -------------------------------------------------------
export const loadCrimesDataHandler = () => {
  alert("In loadCrimesDataHandler function")
}

export { getCrimesData as default }
