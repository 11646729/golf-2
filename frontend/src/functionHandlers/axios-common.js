import axios from "axios"

// -------------------------------------------------------
// Common function to get data from the SQL database
// -------------------------------------------------------
export const getCommonData = (url) =>
  axios
    .get(url)
    .then((response) => response.data)
    .catch((err) => console.log(err))

// -------------------------------------------------------
// Common function to post data to the SQL database
// -------------------------------------------------------
export const postCommonData = (url) =>
  axios
    .post(url)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => console.log(err))

export { getCommonData as default }

// axios.post('/user', {
//   firstName: 'Fred',
//   lastName: 'Flintstone'
// })
// .then(function (response) {
//   console.log(response);
// })
// .catch(function (error) {
//   console.log(error);
// });
