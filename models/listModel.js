const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const listSchema = new mongoose.Schema({
  email: String,
  movieId: ObjectId,
  movieName: String,
});

const ListModel = mongoose.model('list', listSchema);

module.exports = ListModel;