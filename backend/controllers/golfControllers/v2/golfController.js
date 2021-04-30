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
export const getAllCourses = async (req, res) => {
  try {
    let db = null

    db = await openSqlDbConnection(process.env.SQL_URI)

    if (db !== null) {
      const sql = "SELECT * FROM GolfCourses ORDER BY courseId"
      const result = await db.all(sql)

      closeSqlDbConnection(db)

      res.send(result)
    }
  } catch (e) {
    console.error(e.message)
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
