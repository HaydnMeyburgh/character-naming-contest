const jwt = require("jsonwebtoken");
const Users = require("../models").Users;
const bcrypt = require("bcrypt");
const saltRounds = 10;
require("dotenv").config();

const signUp = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    // Hash password and create user
    const newUser = await Users.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: bcrypt.hashSync(password, saltRounds),
    });
    if (newUser) {
      return res.status(200).send({
        message: "User registered successfully!",
      });
    }
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { password, email } = req.body;
  try {
    // Checking to see if user exists
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).send({
        message: "Invalid Credentials, user not found",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).send({
        message: "Incorrect Password",
      });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWTSECRET, {
      expiresIn: 86400,
    });
    res.cookie("auth_cookie", token, { httpOnly: true }).status(200).send({
      message: "Successfully Logged in",
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    return res.clearCookie("auth_cookie").status(200).send({
      message: "You've been signed out!",
    });
  } catch (err) {
    this.next(err);
  }
};

module.exports = {
  signUp,
  loginUser,
  logoutUser,
};
