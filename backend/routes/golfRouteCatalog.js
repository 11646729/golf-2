import express from "express"
const router = express.Router()
const golfController = require("../controllers/golfController")

// -------------------------------------------------------
// GET catalogue home page
// -------------------------------------------------------
router.get("/", golfController.index)

// -------------------------------------------------------
// GET all Golf Courses
// -------------------------------------------------------
router.get("/nearbyGolfCourses/", golfController.getAllCourses)

// -------------------------------------------------------
// GET a Golf Course by id
// -------------------------------------------------------
// router.get("/course/:id", golfController.getOneCourse)

module.exports = router
