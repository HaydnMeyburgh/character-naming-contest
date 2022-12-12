const express = require("express");
const namesRouter = express.Router();
const { updateName, deleteName } = require("../controllers/names.controllers");
const auth = require("../middleware/auth");

namesRouter.put("/:nameId", auth, updateName);

namesRouter.delete("/:nameId", auth, deleteName);

module.exports = namesRouter;
