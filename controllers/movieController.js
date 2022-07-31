const MovieModel = require('../models/movieModel.js');

exports.getMovie = async (req, res) => {
  try {
    const movieData = await MovieModel.find();
    // console.log(movies);
    // let movieData = [];
    // for(let x in movies){
    //   movieData.push(x);
    // }
    res.render('../views/index.ejs', { movieData, title: "All Movies" })
  } catch (err) {
    console.log(err);
  }
}

exports.postMovie = async (req, res) => {
  // console.log(req.body);
  try {
    await MovieModel.create({ ...req.body });
    res.redirect('/addmovie');
  } catch (err) {
    console.log(err);
  }
}
