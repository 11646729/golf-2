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
          err.message || "Some error ocurred while retrieving golfCourses.",
      })
    })
}

// -------------------------------------------------------
// Path: localhost:5000/api/golf/courses/:id
// -------------------------------------------------------
// export const getCourse = async (req, res) => {
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
// export const create = async (req, res) => {
//   // Validate request
//   if (!req.body.location_lat || !req.body.location_lng) {
//     res.status(400).send({ message: "Coordinates cannot be empty!" })
//     return
//   }
//   // Create a new location object
//   const location = new CoordsSchema({
//     lat: req.body.location_lat,
//     lng: req.body.location_lng,
//   })

//   const golfCourse = new GolfCourseSchema({
//     databaseVersion: req.body.database_version,
//     type: req.body.type,
//     crsName: req.body.crs_name,
//     crsUrn: req.body.crs_urn,
//     name: req.body.name,
//     phoneNumber: req.body.phone_number,
//     photoTitle: req.body.photo_title,
//     photoUrl: req.body.photo_url,
//     description: req.body.description,
//     location: location,
//   })

//   // Save the golfCourse in the database
//   golfCourse
//     .save()
//     .then((data) => {
//       res.send(data)
//     })
//     .catch((err) =>
//       res.status(500).send({
//         message:
//           err.message || "Some error ocurred while creating a new Golf Course.",
//       })
//     )
// }

// -------------------------------------------------------
// Path: localhost:5000/api/golf/courses/:id
// -------------------------------------------------------
// export const updateOne = async (req, res) => {
//   if (!req.body) {
//     return res.status(400).send({
//       message: "Data to update cannot be empty!",
//     })
//   }

//   const id = req.params.id

//   GolfCourseSchema.findByIdAndUpdate(id, req.body, {
//     useFindAndModify: false,
//   })
//     .then((data) => {
//       if (!data)
//         res.status(404).send({
//           message:
//             "Cannnot update golfCourse with id=${id}. Maybe golfCourse was not found!",
//         })
//       else res.send({ message: "Golf Course was updated successfully." })
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: err.message || "Error updating golfCourse with id= " + id,
//       })
//     })
// }

// -------------------------------------------------------
// Path: localhost:5000/api/golf/courses
// -------------------------------------------------------
// export const deleteAll = async (req, res) => {
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
// export const deleteOne = async (req, res) => {
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

// Function to save golf course data to mongodb
export const saveGolfCourseDataToDatabase = async () => {
  // Firstly delete all existing Golf Courses in the database
  GolfCourseSchema.deleteMany({})
    .then((res) => {
      console.log("No of Golf Courses successfully deleted: ", res.deletedCount)
    })
    .catch((err) => {
      console.log(
        err.message || "An error occurred while removing all Golf Courses"
      )
    })

  const golfjson = process.env.RAW_GOLF_COURSE_DATA_FILEPATH

  fs.readFile(golfjson, "utf8", (err, data) => {
    if (err) {
      throw err
    }

    reduceGolfCourses(JSON.parse(data))
  })
}

// Function to extract data then save it in the mongodb database
const reduceGolfCourses = async (course) => {
  let loop = 0
  do {
    const golfCourseCoords = new CoordsSchema({
      lat: course.features[loop].geometry.coordinates[1],
      lng: course.features[loop].geometry.coordinates[0],
    })

    // Now create a model instance
    const golfCourse = new GolfCourseSchema({
      databaseVersion: process.env.DATABASE_VERSION,
      type: "Golf Club",
      crsName: "WGS84",
      crsUrn: "urn:ogc:def:crs:OGC:1.3:CRS84",
      name: course.features[loop].properties.name,
      phoneNumber: course.features[loop].properties.phoneNumber,
      photoTitle: "Istanbul Bridge Photo",
      photoUrl: "static/images/Bosphorus.jpg",
      description:
        "Istanbul is a major city in Turkey that straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects cultural influences of the many empires that once ruled here.",
      coordinates: golfCourseCoords,
    })

    // Now save in mongoDB
    golfCourse
      .save()
      // .then(() => console.log(i + " golfCourses saved to mongoDB"))
      .catch((err) => console.log("Error saving golfCourse to mongoDB " + err))

    loop++
  } while (loop < course.features.length)
}
