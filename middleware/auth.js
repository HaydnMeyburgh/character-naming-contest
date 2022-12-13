require("dotenv").config();
const jwt = require("jsonwebtoken");
const Users = require("../models").Users;

const auth = (req, res, next) => {
  let token = req.session.token;
  if (!token) {
    return res.status(403).send({
      message: "No token provided",
    });
  }
  jwt.verify(token, process.env.JWTSECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorised!",
      });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = auth;
