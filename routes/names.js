const express = require("express");
const namesRouter = express.Router();
const { deleteName } = require("../controllers/names.controllers");
const auth = require("../middleware/auth");

namesRouter.delete("/:nameId", auth, deleteName);

module.exports = namesRouter;
