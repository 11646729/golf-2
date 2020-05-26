import express from "express"
var router = express.Router()

// Require golf controller module
var golf_controller = require("../../../controllers/golfControllers/v2/golfController")

/// Cruise Routes ///
// GET catalogue home page
router.get("/", golf_controller.golfIndex)

/// Nearby Golf Courses Routes ///
// GET all nearbyGolfCourses
router.get("/nearbyGolfCourses", golf_controller.findAll)

// GET a nearbyGolfCourse by id
router.get("/nearbyGolfCourses/:id", golf_controller.findOne)

// POST a new nearbyGolfCourse
router.post("/nearbyGolfCourses", golf_controller.create)

// UPDATE a nearbyGolfCourse by id
router.put("/nearbyGolfCourses/:id", golf_controller.updateOne)

// DELETE all nearbyGolfCourses
router.delete("/nearbyGolfCourses", golf_controller.deleteAll)

// DELETE a nearbyGolfCourse by id
router.delete("/nearbyGolfCourses/:id", golf_controller.deleteOne)

module.exports = router
