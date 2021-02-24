const fs = require("fs")
import { GolfCourseSchema } from "../../../models/golfModels/v2/courseSchema"
import { CoordsSchema } from "../../../models/commonModels/v1/coordsSchema"

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

// -------------------------------------------------------
// Path: localhost:5000/api/golf/courses
// -------------------------------------------------------
// export const deleteAllCourses = async (req, res) => {
//   GolfCourseSchema.deleteMany({})
//     .then((data) => {
//       res.send({
//         message: "${data.deletedCount} Golf Courses were deleted successfully!",
//       })
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Golf Courses",
//       })
//     })
// }

// -------------------------------------------------------
// Path: localhost:5000/api/golf/courses/:id
// -------------------------------------------------------
// export const deleteOneCourse = async (req, res) => {
//   const id = req.params.id

//   GolfCourseSchema.findByIdAndRemove(id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message:
//             "Cannot delete golfCourse with id=${id}. Maybe golfCourse was not found!",
//         })
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete golfCourse with id=" + id,
//       })
//     })
// }

// -------------------------------------------------------
// Create Golf Courses in the Database
// Path: local function called in switchBoard
// -------------------------------------------------------
export const createGolfCourses = () => {
  // Firstly delete all existing Golf Courses in the database
  GolfCourseSchema.deleteMany({})
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

          reduceGolfCourses(JSON.parse(data))
        }
      )
    })
    .catch((err) => {
      console.log(
        err.message || "An error occurred while deleting old Golf Courses"
      )
    })
}

// ------------------------------------------------------------------
// Local function to format data then save it in the mongodb database
// ------------------------------------------------------------------
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
      type: "Golf Club",
      crsName: "WGS84",
      crsUrn: "urn:ogc:def:crs:OGC:1.3:CRS84",
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
      .catch((err) => console.log("Error saving golfCourse to mongoDB " + err))

    loop++
  } while (loop < courses.features.length)

  console.log("No of new Golf Courses saved: ", loop)
}
