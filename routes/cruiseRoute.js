var express = require("express")
var router = express.Router()

// Require cruise controller module
var cruise_controller = require("../controllers/cruiseController")

// GET all vessels
router.get("/cruises", cruise_controller.vessels)

module.exports = router
