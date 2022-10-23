import { getCommonData, postCommonData } from "./axios-common"

// -------------------------------------------------------
// Function to prepare the golfcourses table in the SQL database
// -------------------------------------------------------
const prepareGolfCoursesTable = (url) => postCommonData(url)

// -------------------------------------------------------
// Function to instruct backend to load Golf Club Data into the database
// -------------------------------------------------------
const initialImportOfGolfCoursesData = (url) => getCommonData(url)

// -------------------------------------------------------
// Function to fetch all Golf Course data - DON'T TRY TO REFACTOR THIS
// -------------------------------------------------------
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
