const PremiumModel = require("../models/premiumModel.js");

// payment = async (req, res) => {

// }

exports.paymentGet = async (req, res) => {
  res.redirect("/account");
}

exports.paymentPost = async (req, res) => {
  const { email, ccNumber, pin } = req.body;
  const payment = new PremiumModel({ email, ccNumber, pin });
  console.log("Before save");
  return await payment.save();
  console.log("After save");
}

// exports.checkPremium = async (req, res) => {

// }