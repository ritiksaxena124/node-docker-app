const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "User must have a unique username"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "User must have a secure password"],
  },
});

const User = mongoose.model("User", userschema);

module.exports = User;
