import axios from "axios"

// -------------------------------------------------------
// Function to fetch all Golf Courses data into the SQL database
// -------------------------------------------------------
export var loadGolfCourseDataHandler = () => {
  // Prepare empty golf courses table in the database & show result
  prepareGolfCoursesTable()

  // Import the golf course file data into the database
  importGolfCoursesData()
}

// -------------------------------------------------------
// Function to prepare the golfcourses table in the SQL database
// -------------------------------------------------------
var prepareGolfCoursesTable = async () => {
  let params = {}
  let config = {
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  }

  await axios
    .post(
      "http://localhost:4000/api/golf/prepareGolfCoursesTable",
      params,
      config
    )
    //    .then((returnedData) => console.log(returnedData))
    .then(() => alert("Empty golfcourses table prepared"))
    .catch((err) => console.log(err))
}

// -------------------------------------------------------
// Function to instruct backend to load Golf Club Data into the database
// -------------------------------------------------------
var importGolfCoursesData = async () => {
  let params = {}
  let config = {
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
    },
  }

  await axios
    .post(
      "http://localhost:4000/api/golf/importGolfCoursesData",
      params,
      config
    )
    //    .then((returnedData) => console.log(returnedData))
    .then(() => alert("Golf Course data loaded into the SQL database"))
    .catch((err) => console.log(err))
}
