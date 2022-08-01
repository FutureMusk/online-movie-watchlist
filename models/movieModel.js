const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  movieName: String,
  year: String,
  image: String,
});

movieSchema.index({ movieName: "text", year: "text" });
const MovieModel = mongoose.model('movie', movieSchema);

module.exports = MovieModel;
