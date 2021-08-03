import express from "express"
var golfRouter = express.Router()
import golfController from "../controllers/golfController.js"

// -------------------------------------------------------
// GET Golf Catalogue home page
// -------------------------------------------------------
// golfRouter.get("/", golfController.index())

golfRouter.get("/", function (req, res) {
  res.send("Wiki home page")
})

// -------------------------------------------------------
// GET all Golf Courses
// -------------------------------------------------------
// golfRouter.get("/nearbyGolfCourses", golfController.getAllCourses)

golfRouter.get("/nearbyGolfCourses", function (req, res) {
  res.send("get NearbyGolfCourses page")
})

// -------------------------------------------------------
// GET a Golf Course by id
// -------------------------------------------------------
// router.get("/course/:id", golfController.getOneCourse)

export default golfRouter
