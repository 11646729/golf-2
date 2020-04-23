import express from "express"
var router = express.Router()

// Require golf controller module
var golf_controller = require("../../../controllers/golfControllers/golfController")

/// Nearby Golf Courses Routes ///

// Get catalogue home page
router.get("/", golf_controller.index_get)

// Get nearby golf course details from the database
router.get("/nearbyGolfCourses", golf_controller.nearby_golf_course_getAll)

// Post details of a nearby golf course to the database
router.post("/nearbyGolfCourse/add", golf_controller.nearby_golf_course_add)

module.exports = router
