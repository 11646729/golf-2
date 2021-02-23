import express from "express"
const router = express.Router()
const golfController = require("../../../controllers/golfControllers/v2/golfController")

// -------------------------------------------------------
// GET catalogue home page
// -------------------------------------------------------
router.get("/", golfController.index)

// -------------------------------------------------------
// GET all nearby Golf Courses
// -------------------------------------------------------
router.get("/nearbycourse/", golfController.getAllCourses)

// -------------------------------------------------------
// GET a nearby Golf Course by id
// -------------------------------------------------------
// router.get("/nearbycourse/:id", golfController.getCourse)

// -------------------------------------------------------
// POST a new nearby Golf Course
// -------------------------------------------------------
// router.post("/nearbycourse/", golfController.create)

// -------------------------------------------------------
// UPDATE a nearby Golf Course by id
// -------------------------------------------------------
// router.put("/nearbycourse/:id", golfController.updateOne)

// -------------------------------------------------------
// DELETE all nearby Golf Courses
// -------------------------------------------------------
// router.delete("/nearbycourse/", golfController.deleteAll)

// -------------------------------------------------------
// DELETE a nearbyGolfCourse by id
// -------------------------------------------------------
// router.delete("/nearbycourse/:id", golfController.deleteOne)

module.exports = router
