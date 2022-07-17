require("dotenv").config();

const express = require("express");

const dbConnect = require('./utils/dbConnect.js');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

//Connect to db and listen to port
dblink = process.env.URI;
dbConnect(dblink).then(() => {
  app.listen(process.env.PORT);
  console.log(`Listening to port ${process.env.PORT}`);
});