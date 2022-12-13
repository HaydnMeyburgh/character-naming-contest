const express = require("express");
const usersRouter = express.Router();
const {
  loginUser,
  logoutUser,
  signUp,
} = require("../controllers/users.controllers");
const verifySignup = require("../middleware/verifySignUp");

usersRouter.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

usersRouter.post("/signup", verifySignup, signUp);

usersRouter.post("/login", loginUser);

usersRouter.post("/logout", logoutUser);

module.exports = usersRouter;
