const express = require("express")
const router = express.Router()

/* GET home page. */
// router.get("/", (req, res, next) => {
//   var data = { title: "Golf Test Routines" };
//   res.render("home", data);
// });

router.get("/", (req, res, next) => {
  res.redirect("/catalog")
  // .sendFile("index.html", { root: __dirname });
})

/* golf-1 Home Page */
// router.get("/", (req, res, next) => {
//   res.sendFile("index.html", { root: __dirname });
// });

module.exports = router
