var express = require("express")
var router = express.Router()

// Require controller modules
var golf_controller = require("../controllers/golfController")
var user_controller = require("../controllers/userController")
var cruise_controller = require("../controllers/cruiseController")

/// GOLF ROUTES ///

// GET golf home page
router.get("/", golf_controller.index)

/// USER ROUTES ///

// GET catalog home page
router.get("/", user_controller.index)

/// CRUISE ROUTES ///

// GET cruise home page
router.get("/", cruise_controller.index)

module.exports = router
