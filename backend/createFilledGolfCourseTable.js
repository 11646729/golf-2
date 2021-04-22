const fs = require("fs")

// -------------------------------------------------------
// Create Golf Courses Table in the SQLite Database
// Path: Function called in switchBoard
// -------------------------------------------------------
export const createFilledGolfCourseTable = async (db) => {
  const golfCourses_create =
    "CREATE TABLE IF NOT EXISTS GolfCourses (course_id INTEGER PRIMARY KEY AUTOINCREMENT, databaseVersion INTEGER, type VARCHAR(100) NOT NULL, crsUrn VARCHAR(100) NOT NULL, name VARCHAR(100) NOT NULL, phoneNumber VARCHAR(100) NOT NULL, photoTitle VARCHAR(100) NOT NULL, photoUrl VARCHAR(100) NOT NULL, description VARCHAR(200), course_lng REAL CHECK( course_lng >= -180 AND course_lng <= 180 ), course_lat REAL CHECK( course_lat >= -90 AND course_lat <= 90 ))"

  try {
    // Firstly create an empty Table in the database
    db.run(golfCourses_create, (err) => {
      console.log("Successful creation of the empty 'GolfCourses' table")
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
        let myData = JSON.parse(data)
        // console.log(myData.features.length)
        populateGolfCourses(db, myData)
      }
    )
  } catch (e) {
    return console.error(e.message)
  }
}

// -------------------------------------------------------
// Local function
// -------------------------------------------------------
const populateGolfCourses = async (db, courses) => {
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
      const sql_insert =
        "INSERT INTO GolfCourses (databaseVersion, type, crsUrn, name, phoneNumber, photoTitle, photoUrl, description, course_lng, course_lat) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 )"
      await db.run(sql_insert, course)
      loop++
    } while (loop < courses.features.length)
    console.log("No of new Golf Courses created & saved: ", loop)
    // return loop
  } catch (e) {
    console.error(e.message)
  }
}
