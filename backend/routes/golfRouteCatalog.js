import express from "express"
var golfRouter = express.Router()
import {
  index,
  getAllNearbyGolfCourses,
  fetchGolfCourses,
} from "../controllers/golfController.js"

// -------------------------------------------------------
// GET Golf Catalogue home page
// -------------------------------------------------------
golfRouter.get("/", index)

// -------------------------------------------------------
// GET all Golf Courses
// -------------------------------------------------------
golfRouter.get("/nearbyGolfCourses", getAllNearbyGolfCourses)

// -------------------------------------------------------
// PUT all Golf Courses data into the database
// -------------------------------------------------------
golfRouter.put("/loadGolfCourses", fetchGolfCourses)

export default golfRouter
