import express from "express"
import {
  index,
  prepareEmptyGolfCoursesTable,
  getGolfCourses,
  importGolfCoursesData,
} from "../controllers/golfCourseController.js"

var golfRouter = express.Router()

// ---------------------------------------------------
// Golf Routes
// ---------------------------------------------------
// GET catalogue home page
golfRouter.get("/", index)

// Prepare the golfcourses table in the database
golfRouter.post("/prepareGolfCoursesTable", prepareEmptyGolfCoursesTable)

// GET all Golf Courses data from the database
golfRouter.get("/getGolfCourses", getGolfCourses)

// PUT all Golf Courses data into the database
golfRouter.put("/importGolfCoursesData", importGolfCoursesData)

export default golfRouter
