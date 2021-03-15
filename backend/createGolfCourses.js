const fs = require("fs")
import { GolfCourseSchema } from "./models/golfModels/v2/courseSchema"
import { CoordsSchema } from "./models/commonModels/v1/coordsSchema"

// -------------------------------------------------------
// Create Golf Courses in the Database
// Path: local function called in switchBoard
// -------------------------------------------------------
export const createGolfCourses = async (req, res) => {
  // Firstly delete all existing Golf Courses in the database
  await GolfCourseSchema.deleteMany({})
    .then((res) => {
      console.log("No of old Golf Courses deleted: ", res.deletedCount)

      // Secondly read all Golf Courses from the database
      fs.readFile(
        process.env.RAW_GOLF_COURSE_DATA_FILEPATH,
        "utf8",
        (err, data) => {
          if (err) {
            throw err
          }

          // Thirdly format data then save it in the mongodb database
          reduceGolfCourses(JSON.parse(data))
        }
      )
    })
    .catch((err) => {
      console.log(err.message)
    })
}

// -------------------------------------------------------
// Local function
// -------------------------------------------------------
const reduceGolfCourses = (courses) => {
  let loop = 0
  do {
    const golfCourseCoords = new CoordsSchema({
      lat: courses.features[loop].geometry.coordinates[1],
      lng: courses.features[loop].geometry.coordinates[0],
    })

    // Now create a model instance
    const golfCourse = new GolfCourseSchema({
      databaseVersion: process.env.DATABASE_VERSION,
      type: process.env.TYPE_GOLF_CLUB,
      crsUrn: courses.crs.properties.name,
      name: courses.features[loop].properties.name,
      phoneNumber: courses.features[loop].properties.phoneNumber,
      photoTitle: courses.features[loop].properties.photoTitle,
      photoUrl: courses.features[loop].properties.photoUrl,
      description: courses.features[loop].properties.description,
      coordinates: golfCourseCoords,
    })

    // Now save in mongoDB
    golfCourse
      .save()
      .catch((err) =>
        console.log("Error saving Golf Courses to database " + err)
      )

    loop++
  } while (loop < courses.features.length)

  console.log("No of new Golf Courses created & saved: ", loop)
}
