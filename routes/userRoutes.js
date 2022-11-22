const express = require("express");
const userController = require("../controllers/authController");
const router = express.Router();

router.route("/signup").post(userController.signUp);
router.route("/signin").post(userController.signIn);

module.exports = router;
