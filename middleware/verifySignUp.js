const Users = require("../models").Users;

const verifySignup = async (req, res, next) => {
  const { username, email } = req.body;
  try {
    let user = await Users.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      return res.status(400).send({
        message: "Failed! Email is already in use!",
      });
    }
    if (username === "" || email === "") {
      return res.status(400).send({
        message: "Username and/or email cannot be blank!",
      });
    }
    next();
  } catch (err) {
    return res.status(500).send({
      message: err.message,
    });
  }
};

module.exports = verifySignup;
