var express = require("express");
var router = express.Router();

// Require controller modules
var golf_controller = require("../controllers/golfController");

/// GOLF ROUTES ///

// GET catalog home page
router.get("/", golf_controller.index);

module.exports = router;
