import express from "express"
var golfRouter = express.Router()
import {
  index,
  prepareEmptyGolfCoursesTable,
  importGolfCoursesData,
  getGolfCourses,
} from "../controllers/golfCourseController.js"

// -------------------------------------------------------
// GET Golf Catalogue home page
// -------------------------------------------------------
golfRouter.get("/", index)

// -------------------------------------------------------
// Prepare the golfcourses table in the SQL database
// -------------------------------------------------------
golfRouter.post("/prepareGolfCoursesTable", prepareEmptyGolfCoursesTable)

// -------------------------------------------------------
// PUT all Golf Courses data into the SQL database
// -------------------------------------------------------
golfRouter.put("/importGolfCoursesData", importGolfCoursesData)

// -------------------------------------------------------
// GET all Golf Courses data from the SQL database
// -------------------------------------------------------
golfRouter.get("/getGolfCourses", getGolfCourses)

export default golfRouter
