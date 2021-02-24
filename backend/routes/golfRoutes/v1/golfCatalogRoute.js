import express from "express"
var router = express.Router()

// Require golf controller module
var golf_controller = require("../../../controllers/golfControllers/golfController")

/// Golf Routes ///
// Get catalogue home page
router.get("/", golf_controller.index_get)

/// Golf Courses Routes ///
// Get golf course details from the database
router.get("/golfCourses", golf_controller.golf_course_getAll)

// Post details of a golf course to the database
router.post("/golfCourse/add", golf_controller.golf_course_add)

module.exports = router
