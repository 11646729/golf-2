export const createFilledGolfCourseTable = async (db) => {
  const golfCourses_create =
    "CREATE TABLE IF NOT EXISTS GolfCourses (course_id INTEGER PRIMARY KEY AUTOINCREMENT, databaseVersion INTEGER, type VARCHAR(100) NOT NULL, crsUrn VARCHAR(100) NOT NULL, name VARCHAR(100) NOT NULL, phoneNumber VARCHAR(100) NOT NULL, photoTitle VARCHAR(100) NOT NULL, photoUrl VARCHAR(100) NOT NULL, description VARCHAR(200), course_lng REAL CHECK( course_lng >= -180 AND course_lng <= 180 ), course_lat REAL CHECK( course_lat >= -90 AND course_lat <= 90 ))"

  db.run(golfCourses_create, (err) => {
    if (err) {
      return console.error(err.message)
    }
    console.log("Successful creation of the 'GolfCourses' table")
  })
}
