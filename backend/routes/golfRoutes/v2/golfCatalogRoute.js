import express from "express"
var router = express.Router()

// Require golf controller module
var golf_controller = require("../../../controllers/golfControllers/v2/golfController")

/// Cruise Routes ///
// Get catalogue home page
router.get("/", golf_controller.index_get)

/// Nearby Golf Courses Routes ///
// Get all nearby golf course details from the database
router.get("/nearbyGolfCourses", golf_controller.findAll)

// Get nearbyGolfCourse by id
// router.get("/nearbyGolfCourses", golf_controller.findAll)

// Post details of a nearby golf course to the database
// router.post("/nearbyGolfCourse/add", golf_controller.nearby_golf_course_add)

module.exports = router
