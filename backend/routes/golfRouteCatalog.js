import express from "express"
var golfRouter = express.Router()
import {
  index,
  getAllNearbyGolfCourses,
} from "../controllers/golfController.js"

// -------------------------------------------------------
// GET Golf Catalogue home page
// -------------------------------------------------------
golfRouter.get("/", index)

// -------------------------------------------------------
// GET all Golf Courses
// -------------------------------------------------------
golfRouter.get("/nearbyGolfCourses", getAllNearbyGolfCourses)

export default golfRouter
