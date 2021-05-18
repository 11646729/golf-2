const fs = require("fs")
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
export const fetchGolfCourses = () => {
  // Open a Database Connection
  let db = null
  db = openSqlDbConnection(process.env.SQL_URI)

  if (db !== null) {
    try {
      // Firstly create an empty Table in the database - IF NEEDED
      const golfCourses_create =
        "CREATE TABLE IF NOT EXISTS golfcourses (courseid INTEGER PRIMARY KEY AUTOINCREMENT, databaseversion INTEGER, type TEXT NOT NULL, crsurn TEXT NOT NULL, name TEXT NOT NULL, phonenumber TEXT NOT NULL, phototitle TEXT NOT NULL, photourl TEXT NOT NULL, description TEXT, courselng REAL CHECK( courselng >= -180 AND courselng <= 180 ), courselat REAL CHECK( courselat >= -90 AND courselat <= 90 ))"

      db.all(golfCourses_create, [], (err) => {
        if (err) {
          return console.error(err.message)
        }
        console.log("golfcourses Table successfully created")
      })

      // Secondly fetch all the Golf Courses data
      fs.readFile(
        process.env.RAW_GOLF_COURSE_DATA_FILEPATH,
        "utf8",
        (err, data) => {
          if (err) {
            throw err
          }

          // Thirdly save the data in the Golf Courses Table in the SQLite database
          let courses = JSON.parse(data)
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
        "INSERT INTO golfcourses (databaseversion, type, crsurn, name, phonenumber, phototitle, photourl, description, courselng, courselat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )"
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
