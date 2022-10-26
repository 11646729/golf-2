import axios from "axios"

// -------------------------------------------------------
// Common function to get data from the SQL database
// -------------------------------------------------------
export const getCommonData = (url, params, config) => {
  axios
    .get(url, params, config)
    .then((response) => response.data)
    .catch((err) => console.log(err))
}

// -------------------------------------------------------
// Common function to post data to the SQL database
// -------------------------------------------------------
export const postCommonData = (url, params, config) =>
  axios
    .post(url, params, config)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => console.log(err))

export { getCommonData as default }
