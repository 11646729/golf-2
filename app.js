const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const createError = require("http-errors")
const favicon = require("serve-favicon")
const cors = require("cors")
const mongoose = require("mongoose")

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise

// Initiate our server
const app = express()

// view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "hbs");

// Favicon setup
app.use(favicon(path.join(__dirname, "public/images", "Golf_Pin.ico")))

// Static file location
app.use(express.static(path.join(__dirname, "public")))

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// cors settings from https://blog.jscrambler.com/setting-up-5-useful-middlewares-for-an-express-api/
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"]
  })
)

// use controllers as per Express Tutorial
const indexRouter = require("./routes/indexRoute")
const usersRouter = require("./routes/usersRoute")
const golfRouter = require("./routes/golfRoute")
const screenScraperRouter = require("./routes/screenScraperRoute")

// routes
app.use("/", indexRouter)
app.use("/users", usersRouter)
app.use("/golf", golfRouter)
app.use("/screenScraper", screenScraperRouter)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

module.exports = app