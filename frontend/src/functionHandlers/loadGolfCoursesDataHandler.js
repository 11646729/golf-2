import axios from "axios"

// -------------------------------------------------------
// Function to fetch all Golf Courses data into the SQL database
// -------------------------------------------------------
export var loadGolfCoursesDataHandler = () => {
  // Prepare empty golf courses table in the database & show result
  prepareGolfCoursesTable()

  // Initial import of the golf course file data into the database
  initialImportOfGolfCoursesData()
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
var initialImportOfGolfCoursesData = async () => {
  let params = {}
  let config = {
    timeout: 20000,
    headers: {
      "Content-Type": "application/json",
    },
  }

  await axios
    .get("http://localhost:4000/api/golf/importGolfCoursesData", params, config)
    //    .then((returnedData) => console.log(returnedData))
    .then(() => console.log("Golf Course data loaded into the SQL database"))
    .catch((err) => console.log(err))
}

// -------------------------------------------------------
// Function to fetch all Golf Course data - DON'T TRY TO REFACTOR THIS
// -------------------------------------------------------
export var getGolfCoursesData = async () => {
  const resultData = await axios({
    url: "http://localhost:4000/api/golf/getGolfCourses",
    method: "GET",
    timeout: 8000,
    headers: {
      "Content-Type": "application/json",
    },
  })

  return resultData.data
}

export { getGolfCoursesData as default }
