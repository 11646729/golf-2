var express = require("express")
var router = express.Router()

// Require cruise controller module
var cruise_controller = require("../controllers/cruiseController")

// GET all vessels
router.get("/cruise", cruise_controller.vessel)

module.exports = router
