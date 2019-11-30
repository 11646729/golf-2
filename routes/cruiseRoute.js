var express = require("express")
var router = express.Router()

// Require cruise controller module
var cruise_controller = require("../controllers/cruiseController")

// GET all cruises
router.get("/cruise", cruise_controller.cruise)

module.exports = router
