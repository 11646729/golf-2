const express = require("express");
const router = express.Router();

/* GET home page. */
// router.get("/", function(req, res, next) {
//   var data = { title: "Golf Test Routines" };
//   res.render("home", data);
// });

/* golf-1 Home Page */
router.get("/", function(req, res) {
  //  res.sendFile("index.html");
  res.sendFile("index.html", { root: __dirname });
});

module.exports = router;
