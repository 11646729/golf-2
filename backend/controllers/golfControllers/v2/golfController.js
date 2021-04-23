import path from "path"
import { GolfCourseSchema } from "../../../models/golfModels/v2/courseSchema"
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
// Path: localhost:5000/api/golf/courses
// -------------------------------------------------------
export const getAllCourses = async (req, res) => {
  GolfCourseSchema.find({})
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "An error ocurred while retrieving golfCourses.",
      })
    })
}

// -------------------------------------------------------
// Path: localhost:5000/api/golf/courses
// -------------------------------------------------------
export const getAllSqlCourses = async (req, res) => {
  try {
    const db_name = path.join(
      "/Users/briansmith/Documents/GTD/golf-2/backend/",
      "sqlite3 data",
      "general.db"
    )
    console.log(db_name)

    let db = null
    db = await openSqlDbConnection(db_name)
    if (db !== null) {
      console.log("Connected to the SQLite database")
    } else {
      console.log("UNSUCCESSFUL connection to the SQLite database")
    }

    const sql = "SELECT * FROM GolfCourses ORDER BY course_id"
    const result = await db.all(sql)

    closeSqlDbConnection(db)

    res.send(result)
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
