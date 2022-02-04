import express from "express"
var threeRingsRouter = express.Router()
import {
  index,
  getThreeRingsShiftData,
} from "../controllers/threeRingsController.js"

// -------------------------------------------------------
// GET Three Rings Catalogue home page
// -------------------------------------------------------
threeRingsRouter.get("/", index)

// -------------------------------------------------------
// GET all three rings shifts data
// -------------------------------------------------------
threeRingsRouter.get("/shifts", getThreeRingsShiftData)

export default threeRingsRouter
