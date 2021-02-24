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
router.get("/course/", golfController.getAllCourses)

// -------------------------------------------------------
// GET a Golf Course by id
// -------------------------------------------------------
// router.get("/course/:id", golfController.getCourse)

// -------------------------------------------------------
// POST a new Golf Course
// -------------------------------------------------------
// router.post("/course/", golfController.create)

// -------------------------------------------------------
// UPDATE a Golf Course by id
// -------------------------------------------------------
// router.put("/course/:id", golfController.updateOne)

// -------------------------------------------------------
// DELETE all Golf Courses
// -------------------------------------------------------
// router.delete("/course/", golfController.deleteAll)

// -------------------------------------------------------
// DELETE a GolfCourse by id
// -------------------------------------------------------
// router.delete("/course/:id", golfController.deleteOne)

module.exports = router
