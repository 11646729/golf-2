import express from "express"
var golfRouter = express.Router()
import { index, getAllCourses } from "../controllers/golfController.js"

// -------------------------------------------------------
// GET Golf Catalogue home page
// -------------------------------------------------------
golfRouter.get("/", index)

// -------------------------------------------------------
// GET all Golf Courses
// -------------------------------------------------------
golfRouter.get("/nearbyGolfCourses", getAllNearbyGolfCourses)

// -------------------------------------------------------
// GET a Golf Course by id
// -------------------------------------------------------
// router.get("/course/:id", golfController.getOneCourse)

export default golfRouter
