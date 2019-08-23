var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

/* golf-1 Home Page */
// router.get(config.routes.home, function(req, res) {
//   var data = { title: "Golf Test Routines" };
//   res.render("home", data);
// });

module.exports = router;
