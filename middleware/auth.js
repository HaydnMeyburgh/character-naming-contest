require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.cookies.auth_cookie;
  if (!token) {
    return res.status(403).send({
      message: "You must be logged in to do this",
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
