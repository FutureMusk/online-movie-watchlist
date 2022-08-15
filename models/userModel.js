const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;