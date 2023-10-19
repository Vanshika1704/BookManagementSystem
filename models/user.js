// to create a new user collection in db
const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  role: String,
});

const User = mongoose.model("User", userSchema); //this mongoose model/object will help us to talk to the DB
module.exports = User;
