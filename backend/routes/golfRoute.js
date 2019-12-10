var express = require("express")
var router = express.Router()

// Require golf controller module
var golf_controller = require("../controllers/golfController")

// GET all golf courses
router.get("/courses", golf_controller.golf_courses)

module.exports = router
