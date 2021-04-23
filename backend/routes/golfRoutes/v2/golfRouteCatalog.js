import express from "express"
const router = express.Router()
const golfController = require("../../../controllers/golfControllers/v2/golfController")

// -------------------------------------------------------
// GET catalogue home page
// -------------------------------------------------------
router.get("/", golfController.index)

// -------------------------------------------------------
// GET all Golf Courses
// -------------------------------------------------------
// router.get("/nearbyGolfCourses/", golfController.getAllCourses)
router.get("/nearbyGolfCourses/", golfController.getAllSqlCourses)

// -------------------------------------------------------
// GET a Golf Course by id
// -------------------------------------------------------
// router.get("/course/:id", golfController.getOneCourse)

// -------------------------------------------------------
// DELETE all Golf Courses
// -------------------------------------------------------
// router.delete("/course/", golfController.deleteAllCourses)

// -------------------------------------------------------
// DELETE a GolfCourse by id
// -------------------------------------------------------
// router.delete("/course/:id", golfController.deleteOneCourse)

module.exports = router
