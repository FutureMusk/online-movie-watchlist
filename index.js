require("dotenv").config();

const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const session = require("express-session");
const sessExist = require("./utils/sessExist");
const dbConnect = require("./utils/dbConnect.js");
const Movie = require("./controllers/movieController.js");
const User = require("./controllers/userController.js");
const Premium = require("./controllers/premiumController");
const List = require("./controllers/listController");

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  session({
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    secret: process.env.SECRET,
  })
);

// app.get('/', (req, res) => {
//   res.render('index', { title: "Homepage" });
// });

// app.get("/", (req, res) => {
  //   res.render("index", { loggedin: sessExist(req) });
  // });
  
app.get("/", Movie.movieGet);
app.get("/login", (req, res) => res.render("login"));
app.get("/signup", User.signupGet);
app.get("/result", (req, res) => res.render("result"));
app.get("/notauth", (req, res) => res.render("notauth"));
app.get("/addmovie", (req, res) => {
  if (!sessExist(req)) {
    res.render("login");
  } else {
    if (req.session.user.role === "Admin") {
      res.render("addMovie");
    } else {
      res.render("notauth");
    }
  }
});
app.get("/logout", User.logout);
app.get("/account", (req, res) => {
  if (!sessExist(req)) {
    res.render("login");
  } else {
    res.render("account", {
      uname: req.session.user.key,
      role: req.session.user.role,
    });
  }
});
app.get("/payment", Premium.paymentGet);
app.get("/images/:id", Movie.movieGetPoster);

app.post("/login", User.loginPost);
app.post("/signup", User.signupPost);
app.post("/result", Movie.searchMovie);
app.post("/addmovie", Movie.moviePost);
app.post("/payment", Premium.paymentPost);

//Connect to db and listen to port
dblink = process.env.URI;
dbConnect(dblink).then(() => {
  app.listen(process.env.PORT);
  console.log(`Listening to port at http://localhost:${process.env.PORT}`);
});
