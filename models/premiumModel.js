const mongoose = require("mongoose");

const premiumSchema = new mongoose.Schema({
  email: String,
  ccNumber: String,
  pin: String,
});

const PremiumModel = mongoose.model('premium', premiumSchema);

module.exports = PremiumModel;
