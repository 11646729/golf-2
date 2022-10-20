// import axios from "axios"
import { getCommonData, postCommonData } from "./axios-common"

// -------------------------------------------------------
// Function to prepare the golfcourses table in the SQL database
// -------------------------------------------------------
// export const prepareGolfCoursesTable = (url) =>
//   axios
//     .post(url)
//     // .then(() => console.log("Empty golfcourses table prepared"))
//     .catch((err) => console.log(err))

export const prepareGolfCoursesTable = (url) => postCommonData(url)

// -------------------------------------------------------
// Function to instruct backend to load Golf Club Data into the database
// -------------------------------------------------------
// export const initialImportOfGolfCoursesData = (url) =>
//   axios
//     .get(url)
//     .then(() => console.log("Golf Course data loaded into the SQL database"))
//     .catch((err) => console.log(err))

export const initialImportOfGolfCoursesData = (url) => getCommonData(url)

// -------------------------------------------------------
// Function to fetch all Golf Course data - DON'T TRY TO REFACTOR THIS
// -------------------------------------------------------
// export const getGolfCoursesData = (url) =>
//   axios
//     .get(url)
//     // .get("http://localhost:4000/api/golf/getGolfCourses")
//     .then((response) => response.data)
//     .catch((err) => console.log(err))

export const getGolfCoursesData = (url) => getCommonData(url)

// -------------------------------------------------------
// Function to fetch all Golf Courses data into the SQL database
// -------------------------------------------------------
export const loadGolfCoursesDataHandler = () => {
  // Prepare empty golf courses table in the database & show result
  prepareGolfCoursesTable(
    "http://localhost:4000/api/golf/prepareGolfCoursesTable"
  )

  // Initial import of the golf course file data into the database
  initialImportOfGolfCoursesData(
    "http://localhost:4000/api/golf/importGolfCoursesData"
  )
}

export { getGolfCoursesData as default }
