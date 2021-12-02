import fs from "fs"
import { openSqlDbConnection, closeSqlDbConnection } from "../fileUtilities.js"

// -------------------------------------------------------
// Catalogue Home page
// Path: localhost:5000/api/golf/
// -------------------------------------------------------
export var index = (req, res) => {
  res.send({ response: "Golf Route Catalog home page" }).status(200)
}

// -------------------------------------------------------
// Create golfcourses Table in the SQLite database
// -------------------------------------------------------
export const createGolfCoursesTable = (db) => {
  // Guard clause for null Database Connection
  if (db === null) return

  try {
    const sql =
      "CREATE TABLE IF NOT EXISTS golfcourses (courseid INTEGER PRIMARY KEY AUTOINCREMENT, databaseversion INTEGER, type TEXT NOT NULL, crsurn TEXT NOT NULL, name TEXT NOT NULL, phonenumber TEXT NOT NULL, phototitle TEXT NOT NULL, photourl TEXT NOT NULL, description TEXT, lng REAL CHECK( lng >= -180 AND lng <= 180 ), lat REAL CHECK( lat >= -90 AND lat <= 90 ))"

    db.get(sql, [], (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log("golfcourses table successfully created")
    })
  } catch (e) {
    console.error("Error in createGolfCoursesTable: ", e.message)
  }
}

// -------------------------------------------------------
// Drop golfcourses Table in the SQLite database
// -------------------------------------------------------
export const dropGolfCoursesTable = (db) => {
  // Guard clause for null Database Connection
  if (db === null) return

  try {
    const sql = "DROP TABLE IF EXISTS golfcourses"

    db.get(sql, [], (err) => {
      if (err) {
        return console.error(err.message)
      }
      console.log("golfcourses table successfully dropped")
    })
  } catch (e) {
    console.error("Error in dropGolfCoursesTable: ", e.message)
  }
}

// -------------------------------------------------------
// Get all Golf Courses from SQLite database
// Path: localhost:5000/api/golf/getGolfCourses
// -------------------------------------------------------
export const getGolfCourses = (req, res) => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      let sql = "SELECT * FROM golfcourses ORDER BY courseid"

      db.all(sql, [], (err, results) => {
        if (err) {
          return console.error(err.message)
        }

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
// Create Golf Courses Table in the SQLite Database
// Path: Function called in switchBoard
// -------------------------------------------------------
export const loadRawGolfCoursesData = () => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      // Firstly drop the Table in the database - IF NEEDED
      dropGolfCoursesTable(db)

      // Secondly create an empty Table in the database - IF NEEDED
      createGolfCoursesTable(db)

      // Thirdly fetch all the Golf Courses data
      fs.readFile(
        process.env.RAW_GOLF_COURSE_DATA_FILEPATH,
        "utf8",
        (err, data) => {
          if (err) {
            throw err
          }

          // Fourthly save the data in the Golf Courses Table in the SQLite database
          const courses = JSON.parse(data)
          populateGolfCourses(db, courses)
        }
      )
    } catch (e) {
      console.error(e.message)
    }
  } else {
    console.error("Cannot connect to database")
  }
}

// -------------------------------------------------------
// Local function
// -------------------------------------------------------
const populateGolfCourses = async (db, courses) => {
  // Guard clauses
  if (db == null) return
  if (courses == null) return

  let loop = 0
  try {
    do {
      const course = [
        process.env.DATABASE_VERSION,
        process.env.TYPE_GOLF_CLUB,
        courses.crs.properties.name,
        courses.features[loop].properties.name,
        courses.features[loop].properties.phoneNumber,
        courses.features[loop].properties.photoTitle,
        courses.features[loop].properties.photoUrl,
        courses.features[loop].properties.description,
        courses.features[loop].geometry.coordinates[0],
        courses.features[loop].geometry.coordinates[1],
      ]

      const sql =
        "INSERT INTO golfcourses (databaseversion, type, crsurn, name, phonenumber, phototitle, photourl, description, lng, lat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )"
      db.run(sql, course, function (err) {
        if (err) {
          return console.error(err.message)
        }
      })

      loop++
    } while (loop < courses.features.length)

    // Close the Database Connection
    closeSqlDbConnection(db)

    console.log("No of new Golf Courses created & saved: ", loop)
  } catch (e) {
    console.error(e.message)
  }
}

export default getGolfCourses
