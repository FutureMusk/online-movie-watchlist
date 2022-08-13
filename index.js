require("dotenv").config();

const express = require("express");

const dbConnect = require('./utils/dbConnect.js');
const Movie = require('./controllers/movieController.js');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

// app.get('/', (req, res) => {
//   res.render('index', { title: "Homepage" });
// });
app.get('/', Movie.getMovie);
app.get('/addmovie', (req, res) => res.render('addMovie'));
app.get('/result', (req, res) => res.render('result'));
app.get('/login', (req, res) => res.render('login'));
app.get('/signup', (req, res) => res.render('signup'));


app.post('/result', Movie.searchMovie);
app.post('/addmovie', Movie.postMovie);

//Connect to db and listen to port
dblink = process.env.URI;
dbConnect(dblink).then(() => {
  app.listen(process.env.PORT);
  console.log(`Listening to port at http://localhost:${process.env.PORT}`);
});