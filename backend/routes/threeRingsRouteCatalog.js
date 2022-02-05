import express from "express"
var threeRingsRouter = express.Router()
import {
  index,
  getThreeRingsShiftsData,
  getThreeRingsNewsData,
  getThreeRingsEventsData,
} from "../controllers/threeRingsController.js"

// -------------------------------------------------------
// GET Three Rings Catalogue home page
// -------------------------------------------------------
threeRingsRouter.get("/", index)

// -------------------------------------------------------
// GET all three rings shifts data
// -------------------------------------------------------
threeRingsRouter.get("/shifts", getThreeRingsShiftsData)

// -------------------------------------------------------
// GET all three rings shifts data
// -------------------------------------------------------
threeRingsRouter.get("/news", getThreeRingsNewsData)

// -------------------------------------------------------
// GET all three rings shifts data
// -------------------------------------------------------
threeRingsRouter.get("/events", getThreeRingsEventsData)

export default threeRingsRouter
