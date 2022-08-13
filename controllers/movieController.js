const MovieModel = require('../models/movieModel.js');

exports.getMovie = async (req, res) => {
  try {
    const movieData = await MovieModel.find();
    res.render('../views/index.ejs', { movieData, title: "All Movies" })
  } catch (err) {
    console.log(err);
  }
}

exports.postMovie = async (req, res) => {
  try {
    await MovieModel.create({ ...req.body });
    res.redirect('/addmovie');
  } catch (err) {
    console.log(err);
  }
}

exports.searchMovie = async (req, res) => {
  try {
    const result = await MovieModel.find({ $text: { $search: req.body.search } });
    res.render('result', { result, title: "Results"});
  } catch (err) {
    console.log(err);
  }
}
