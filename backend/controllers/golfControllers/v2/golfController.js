// import { GolfCourseSchema } from "../../../models/golfModels/v2/courseSchema"
import {
  openSqlDbConnection,
  closeSqlDbConnection,
} from "../../../fileUtilities"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/golf/
// -------------------------------------------------------
export const index = async (req, res) => {
  res.send({ response: "I am alive" }).status(200)
}

// -------------------------------------------------------
// Get all Golf Courses
// Path: localhost:5000/api/golf/courses
// -------------------------------------------------------
export const getAllCourses = (req, res) => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      let sql = "SELECT * FROM GolfCourses ORDER BY courseId"
      db.all(sql, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }
        // console.log("Record Count Before: ", results.count)
        res.send(results)
      })

      // Close the Database Connection
      closeSqlDbConnection(db)
    } catch (e) {
      console.error(e.message)
    }
  } else {
    console.error("Cannot connect to database")
  }
}

// -------------------------------------------------------
// Path: localhost:5000/api/golf/courses/:id
// -------------------------------------------------------
// export const getOneCourse = async (req, res) => {
//   const id = req.params.id

//   GolfCourseSchema.findById(id)
//     .then((data) => {
//       if (!data)
//         res.status(404).send({ message: "Not found golfCourse with id " + id })
//       else res.send(data)
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Error retrieving golfCourse with id= " + id,
//       })
//     })
// }
