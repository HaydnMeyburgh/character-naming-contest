const express = require("express");
const namesRouter = express.Router();
const { deleteName } = require("../controllers/names.controllers");
const auth = require("../middleware/auth");

namesRouter.use(function (req, res, next) {
  req.header("Access-Control-Allow-Headers", "origin, Content-Type, Accept");
  next();
});

namesRouter.delete("/:nameId", auth, deleteName);

module.exports = namesRouter;
