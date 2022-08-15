const UserModel = require("../models/userModel.js");
const bcrypt = require("bcrypt");

login = async (email, password) => {
  const query = await UserModel.find({ email }).exec();
  if (query.length === 0) {
    return { OK: false, msg: "email or password is incorrect" };
  } else {
    if (await bcrypt.compare(password, query[0].password)) { //query[0].password === password
      return { OK: true, msg: "Login successful", user: query[0] };
    } else {
      return { OK: false, msg: "email or password is incorrect" };
    }
  }
}

exports.loginGet = (req, res) => {
  res.render("login", { title: "Login" });
}

exports.loginPost = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const attempt = await login(email, password);
  if(attempt.OK){
    req.session.user = { key: attempt.user.email, role: attempt.user.isAdmin ? "Admin" : "General" };
    res.redirect('/dashboard');
  } else {
    res.render('login', { title: 'Login', msg: 'Incorrect email or password' });
  }
}

exports.logout = (req, res) => {

}

signup = async (firstName, lastName, userName, email, password, isAdmin) => {
  const hashedPw = await bcrypt.hash(password, 10);
  const user = new UserModel({ firstName, lastName, userName, email, password: hashedPw, isAdmin });
  return await user.save();
}

exports.signupGet = async (req, res) => {
  res.render("signup", { title: "Signup" });
}

exports.signupPost = async (req, res) => {
  const { firstName, lastName, userName, email, password } = req.body;
  const isAdmin = req.body.isAdmin === "on";
  signup(firstName, lastName, userName, email, password, isAdmin);
  res.redirect("/login");
}
