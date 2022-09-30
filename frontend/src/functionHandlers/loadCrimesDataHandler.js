import axios from "axios"

export const loadCrimesDataHandler = () => {
  alert("In loadCrimesDataHandler function")
}

// -------------------------------------------------------
// Function to fetch all Crimes data
// -------------------------------------------------------
export const getCrimesData = (url) =>
  axios.get(url).then((response) => response.data)
