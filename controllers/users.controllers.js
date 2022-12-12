const jwt = require("jsonwebtoken");
const Users = require("../models").Users;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const signUp = async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  try {
    // Check if email is already in use
    let userExists = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (userExists) {
      return res.status(401).send({
        message: "This email is already in use",
      });
    }
    // Check if email or password is blank
    if (username === "" || password === "") {
      return res.status(400).send({
        message: "Username and Password cannot be blank",
      });
    }
    // Hash password and create user
    bcrypt.hash(password, saltRounds, async function (err, hash) {
      const newUser = await Users.create({
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: hash,
      });
      if (!newUser) {
        return res.status(400).send({
          message: "User could not be created",
        });
      }
      res.status(201).send({
        status: "Success",
        data: newUser,
      });
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Checking to see if user exists
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).send({
        message: "Invalid Credentials",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(404).send({
        message: "Incorrect Password or email",
      });
    }
    const token = jwt.sign({ userId: user.id }, "Random_secret", {
      expiresIn: "24h",
    });
    res.status(202).send({
      message: "Successfully Logged in",
      userId: user.id,
      token: token,
    });
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};
// Need to figure out the logout endpoint code
const logoutUser = async (req, res) => {
  try {
    if (req.session) {
      req.session.destroy((err) => {
        if (err) {
          res.status(400).send({
            message: "Unable to log out",
          });
        }
        res.status(200).send({
          message: "Logout successful",
        });
      });
    }
  } catch (err) {}
};

module.exports = {
  signUp,
  loginUser,
  logoutUser,
};
