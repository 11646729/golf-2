import express from "express"
var golfRouter = express.Router()
import {
  index,
  getGolfCourses,
  loadRawGolfCoursesData,
} from "../controllers/golfCourseController.js"

// -------------------------------------------------------
// GET Golf Catalogue home page
// -------------------------------------------------------
golfRouter.get("/", index)

// -------------------------------------------------------
// GET all Golf Courses
// -------------------------------------------------------
golfRouter.get("/getGolfCourses", getGolfCourses)

// -------------------------------------------------------
// PUT all Golf Courses data into the database
// -------------------------------------------------------
golfRouter.put("/loadRawGolfCoursesData", loadRawGolfCoursesData)

export default golfRouter
