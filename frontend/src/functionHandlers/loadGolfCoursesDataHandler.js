import axios from "axios"

// -------------------------------------------------------
// Function to prepare the golfcourses table in the SQL database
// -------------------------------------------------------
export const prepareGolfCoursesTable = () =>
  axios
    .post("http://localhost:4000/api/golf/prepareGolfCoursesTable")
    .then(() => console.log("Empty golfcourses table prepared"))
    .catch((err) => console.log(err))

// -------------------------------------------------------
// Function to instruct backend to load Golf Club Data into the database
// -------------------------------------------------------
export const initialImportOfGolfCoursesData = () =>
  axios
    .get("http://localhost:4000/api/golf/importGolfCoursesData")
    .then(() => console.log("Golf Course data loaded into the SQL database"))
    .catch((err) => console.log(err))

// -------------------------------------------------------
// Function to fetch all Golf Course data - DON'T TRY TO REFACTOR THIS
// -------------------------------------------------------
export const getGolfCoursesData = (url) =>
  axios
    .get(url)
    // .get("http://localhost:4000/api/golf/getGolfCourses")
    .then((response) => response.data)
    .catch((err) => console.log(err))

// -------------------------------------------------------
// Function to fetch all Golf Courses data into the SQL database
// -------------------------------------------------------
export const loadGolfCoursesDataHandler = () => {
  // Prepare empty golf courses table in the database & show result
  prepareGolfCoursesTable()

  // Initial import of the golf course file data into the database
  initialImportOfGolfCoursesData()
}

export { getGolfCoursesData as default }
