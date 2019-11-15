/* Created by briansmith on 23/08/2019 */
var express = require("express")
var router = express.Router()

// Require controller module
var golf_controller = require("../controllers/golfController")

// GET catalog home page
router.get("/", golf_controller.golf_courses)

module.exports = router
