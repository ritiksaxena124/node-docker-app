const User = require("../models/userModels");
const bcrypt = require("bcrypt");

exports.signUp = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({ username, password: hashPassword });
    req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "failed",
    });
  }
};

exports.signIn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "Wrong Credentials!",
      });
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(400).json({
        status: "failed",
        message: "Wrong Credentials!",
      });
    }
    req.session.user = user;
    return res.status(201).json({
      status: "success",
      message: "Login Successful",
    });
  } catch (e) {
    res.status(400).json({
      status: "Failed",
    });
  }
};
