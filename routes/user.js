const express = require("express");
const usersRouter = express.Router();
const {
  loginUser,
  logoutUser,
  signUp,
} = require("../controllers/users.controllers");
const auth = require("../middleware/auth");

usersRouter.post("/register", signUp);

usersRouter.post("/login", auth, loginUser);

usersRouter.delete("/logout", logoutUser);

module.exports = usersRouter;
